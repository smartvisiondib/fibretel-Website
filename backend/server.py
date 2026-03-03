from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ==================== Models ====================

class ConnectionRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    address: str
    plan_id: str
    plan_name: str
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ConnectionRequestCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    address: str
    plan_id: str
    plan_name: str

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str

# Tariff Plan Data
TARIFF_PLANS = [
    {
        "id": "basic-50",
        "name": "Basic 50",
        "speed": "50 Mbps",
        "price": 499,
        "benefits": ["Unlimited Data", "Basic Support", "Free Router"],
        "type": "Home",
        "popular": False
    },
    {
        "id": "standard-100",
        "name": "Standard 100",
        "speed": "100 Mbps",
        "price": 699,
        "benefits": ["Unlimited Data", "24/7 Support", "Free Router", "Static IP"],
        "type": "Home",
        "popular": True
    },
    {
        "id": "turbo-200",
        "name": "Turbo 200",
        "speed": "200 Mbps",
        "price": 999,
        "benefits": ["Unlimited Data", "Priority Support", "Free Router", "Static IP", "OTT Bundle"],
        "type": "Home",
        "popular": False
    },
    {
        "id": "ultra-300",
        "name": "Ultra 300",
        "speed": "300 Mbps",
        "price": 1299,
        "benefits": ["Unlimited Data", "Priority Support", "Premium Router", "Static IP", "OTT Bundle", "Speed Boost"],
        "type": "Home",
        "popular": False
    },
    {
        "id": "gamer-500",
        "name": "Gamer 500",
        "speed": "500 Mbps",
        "price": 1599,
        "benefits": ["Unlimited Data", "Low Latency", "Gaming Router", "Static IP", "Discord Nitro", "24/7 Gaming Support"],
        "type": "Home",
        "popular": True
    },
    {
        "id": "biz-starter",
        "name": "Business Starter",
        "speed": "100 Mbps",
        "price": 1499,
        "benefits": ["Unlimited Data", "Business Support", "Firewall", "5 Static IPs", "SLA 99.5%"],
        "type": "Business",
        "popular": False
    },
    {
        "id": "biz-pro",
        "name": "Business Pro",
        "speed": "300 Mbps",
        "price": 2999,
        "benefits": ["Unlimited Data", "Dedicated Manager", "Enterprise Firewall", "10 Static IPs", "SLA 99.9%", "VPN"],
        "type": "Business",
        "popular": True
    },
    {
        "id": "biz-enterprise",
        "name": "Enterprise",
        "speed": "1 Gbps",
        "price": 5999,
        "benefits": ["Unlimited Data", "Dedicated Support", "DDoS Protection", "50 Static IPs", "SLA 99.99%", "Private VLAN"],
        "type": "Business",
        "popular": False
    },
    {
        "id": "family-pack",
        "name": "Family Pack",
        "speed": "250 Mbps",
        "price": 1199,
        "benefits": ["Unlimited Data", "Parental Controls", "Mesh Router", "Netflix Basic", "5 Devices Priority"],
        "type": "Home",
        "popular": False
    },
    {
        "id": "streamer-400",
        "name": "Streamer 400",
        "speed": "400 Mbps",
        "price": 1399,
        "benefits": ["Unlimited Data", "4K Streaming", "OTT Bundle Pro", "Static IP", "Zero Buffering", "Twitch Integration"],
        "type": "Home",
        "popular": False
    }
]

# ==================== Routes ====================

@api_router.get("/")
async def root():
    return {"message": "CyberNet ISP API"}

@api_router.get("/plans")
async def get_plans(plan_type: Optional[str] = None):
    if plan_type:
        return [p for p in TARIFF_PLANS if p["type"].lower() == plan_type.lower()]
    return TARIFF_PLANS

@api_router.get("/plans/{plan_id}")
async def get_plan(plan_id: str):
    for plan in TARIFF_PLANS:
        if plan["id"] == plan_id:
            return plan
    raise HTTPException(status_code=404, detail="Plan not found")

@api_router.post("/connections", response_model=ConnectionRequest)
async def create_connection(input: ConnectionRequestCreate):
    conn_dict = input.model_dump()
    conn_obj = ConnectionRequest(**conn_dict)
    
    doc = conn_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.connections.insert_one(doc)
    return conn_obj

@api_router.get("/connections", response_model=List[ConnectionRequest])
async def get_connections():
    connections = await db.connections.find({}, {"_id": 0}).to_list(1000)
    for conn in connections:
        if isinstance(conn['created_at'], str):
            conn['created_at'] = datetime.fromisoformat(conn['created_at'])
    return connections

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(input: ContactMessageCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactMessage(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contacts.insert_one(doc)
    return contact_obj

@api_router.get("/contacts", response_model=List[ContactMessage])
async def get_contacts():
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    for contact in contacts:
        if isinstance(contact['created_at'], str):
            contact['created_at'] = datetime.fromisoformat(contact['created_at'])
    return contacts

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
