// This is a simple test script to verify the slot editing functionality
// You can run this in your browser console to test the API endpoints

// Test adding a new slot
async function testAddNewSlot() {
  const date = "2023-12-01"; // Example date
  const time = "7:00 PM - 8:00 PM"; // Example time
  
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/slots/${date}/new`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        time,
        remove: false,
        userDetails: {},
        paymentStatus: "pending",
        completed: false,
      }),
    });
    
    const data = await response.json();
    console.log('Add new slot response:', data);
    return data;
  } catch (error) {
    console.error('Error adding new slot:', error);
  }
}

// Test updating an existing slot
async function testUpdateSlot(slotId) {
  const date = "2023-12-01"; // Example date
  const time = "7:30 PM - 8:30 PM"; // Updated time
  
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/slots/${date}/${slotId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        time,
        remove: false,
        userDetails: {},
        paymentStatus: "pending",
        completed: false,
      }),
    });
    
    const data = await response.json();
    console.log('Update slot response:', data);
    return data;
  } catch (error) {
    console.error('Error updating slot:', error);
  }
}

// Test removing a slot
async function testRemoveSlot(slotId) {
  const date = "2023-12-01"; // Example date
  
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/slots/${date}/${slotId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        remove: true,
      }),
    });
    
    const data = await response.json();
    console.log('Remove slot response:', data);
    return data;
  } catch (error) {
    console.error('Error removing slot:', error);
  }
}

// Run the tests
async function runTests() {
  console.log('Starting slot tests...');
  
  // Add a new slot
  const newSlot = await testAddNewSlot();
  
  if (newSlot && newSlot.success && newSlot.slot && newSlot.slot._id) {
    // Update the slot
    await testUpdateSlot(newSlot.slot._id);
    
    // Remove the slot
    await testRemoveSlot(newSlot.slot._id);
  }
  
  console.log('Tests completed.');
}

// Uncomment to run the tests
// runTests();
