import http from 'http';

// Test signup
const signupData = JSON.stringify({
  name: "John Doe",
  email: "john@test.com",
  username: "johndoe",
  password: "Test123!",
  confirmPassword: "Test123!"
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth/signup',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': signupData.length
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', JSON.parse(data));
    process.exit(0);
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
  process.exit(1);
});

req.write(signupData);
req.end();
