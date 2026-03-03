import requests
import sys
from datetime import datetime

class ISPBackendTester:
    def __init__(self, base_url="https://isp-connect-11.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.api_url = f"{base_url}/api"

    def run_test(self, name, method, endpoint, expected_status, data=None, check_content=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Additional content checks
                if check_content and response.status_code == 200:
                    try:
                        json_data = response.json()
                        if check_content(json_data):
                            print(f"   Content validation: ✅ Passed")
                        else:
                            print(f"   Content validation: ❌ Failed")
                            success = False
                            self.tests_passed -= 1
                    except Exception as e:
                        print(f"   Content validation error: {e}")
                        success = False
                        self.tests_passed -= 1
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if hasattr(response, 'text'):
                    print(f"   Response: {response.text[:200]}...")

            return success, response.json() if response.status_code == 200 else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test(
            "API Root",
            "GET",
            "",
            200,
            check_content=lambda data: "message" in data
        )

    def test_get_all_plans(self):
        """Test getting all plans"""
        return self.run_test(
            "Get All Plans",
            "GET", 
            "plans",
            200,
            check_content=lambda data: (
                isinstance(data, list) and 
                len(data) == 10 and
                all('id' in plan and 'name' in plan and 'speed' in plan and 'price' in plan 
                    for plan in data)
            )
        )

    def test_get_home_plans(self):
        """Test filtering home plans"""
        return self.run_test(
            "Get Home Plans",
            "GET",
            "plans?plan_type=home",
            200,
            check_content=lambda data: (
                isinstance(data, list) and
                all(plan.get('type', '').lower() == 'home' for plan in data) and
                len(data) > 0
            )
        )

    def test_get_business_plans(self):
        """Test filtering business plans"""
        return self.run_test(
            "Get Business Plans", 
            "GET",
            "plans?plan_type=business",
            200,
            check_content=lambda data: (
                isinstance(data, list) and
                all(plan.get('type', '').lower() == 'business' for plan in data) and
                len(data) > 0
            )
        )

    def test_get_specific_plan(self):
        """Test getting a specific plan by ID"""
        return self.run_test(
            "Get Specific Plan",
            "GET",
            "plans/standard-100",
            200,
            check_content=lambda data: (
                data.get('id') == 'standard-100' and
                data.get('name') == 'Standard 100' and
                'speed' in data and 'price' in data
            )
        )

    def test_get_nonexistent_plan(self):
        """Test getting a non-existent plan"""
        return self.run_test(
            "Get Non-existent Plan",
            "GET",
            "plans/nonexistent-plan",
            404
        )

    def test_create_connection(self):
        """Test creating a new connection request"""
        test_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": f"test{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "9876543210",
            "address": "123 Test Street, Test City",
            "plan_id": "standard-100",
            "plan_name": "Standard 100"
        }
        
        return self.run_test(
            "Create Connection",
            "POST",
            "connections",
            200,
            data=test_data,
            check_content=lambda data: (
                data.get('name') == test_data['name'] and
                data.get('email') == test_data['email'] and
                data.get('status') == 'pending' and
                'id' in data
            )
        )

    def test_create_connection_invalid_email(self):
        """Test creating connection with invalid email"""
        test_data = {
            "name": "Test User",
            "email": "invalid-email",
            "phone": "9876543210", 
            "address": "123 Test Street",
            "plan_id": "standard-100",
            "plan_name": "Standard 100"
        }
        
        return self.run_test(
            "Create Connection - Invalid Email",
            "POST",
            "connections",
            422  # FastAPI validation error
        )

    def test_get_connections(self):
        """Test getting all connections"""
        return self.run_test(
            "Get All Connections",
            "GET",
            "connections",
            200,
            check_content=lambda data: isinstance(data, list)
        )

    def test_create_contact(self):
        """Test creating a contact message"""
        test_data = {
            "name": f"Contact Test {datetime.now().strftime('%H%M%S')}",
            "email": f"contact{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "9876543210",
            "subject": "Test Subject",
            "message": "This is a test message"
        }
        
        return self.run_test(
            "Create Contact Message",
            "POST",
            "contact",
            200,
            data=test_data,
            check_content=lambda data: (
                data.get('name') == test_data['name'] and
                data.get('email') == test_data['email'] and
                data.get('subject') == test_data['subject'] and
                'id' in data
            )
        )

    def test_create_contact_missing_fields(self):
        """Test creating contact with missing required fields"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com"
            # Missing subject and message
        }
        
        return self.run_test(
            "Create Contact - Missing Fields",
            "POST",
            "contact",
            422  # FastAPI validation error
        )

    def test_get_contacts(self):
        """Test getting all contacts"""
        return self.run_test(
            "Get All Contacts",
            "GET",
            "contacts",
            200,
            check_content=lambda data: isinstance(data, list)
        )

def main():
    print("🚀 Starting ISP Backend API Tests")
    print("=" * 50)
    
    tester = ISPBackendTester()
    
    # Test all endpoints
    tests = [
        tester.test_api_root,
        tester.test_get_all_plans,
        tester.test_get_home_plans,
        tester.test_get_business_plans,
        tester.test_get_specific_plan,
        tester.test_get_nonexistent_plan,
        tester.test_create_connection,
        tester.test_create_connection_invalid_email,
        tester.test_get_connections,
        tester.test_create_contact,
        tester.test_create_contact_missing_fields,
        tester.test_get_contacts
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test {test.__name__} failed with exception: {e}")
            tester.tests_run += 1
    
    print("\n" + "=" * 50)
    print(f"📊 Backend Test Results:")
    print(f"   Tests Run: {tester.tests_run}")
    print(f"   Tests Passed: {tester.tests_passed}")
    print(f"   Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"   Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())