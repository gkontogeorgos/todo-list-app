# ToDo List App

## Overview
Create a ToDo List App with proper unit tests.

## Features

### Top Area
- **Inputs to create a new ToDo Item:**
  - **Category:** Drop-down menu
  - **Assignee:** Drop-down menu
  - **Priority:** Drop-down menu
  - **Brief Description:** Text input
  - **Completion Target Date:** Date input
- **Button to Save:** Saves the new ToDo item via a local REST endpoint web service.

### Bottom Area
- **Display ToDo Items:** Fetches and displays the saved list of ToDo items from the local REST endpoint web service.
- **Search Functionality:** Allows users to search matching records across all fields (Category, Assignee, Priority, Brief Description) using a single text field.
- **Item Management:**
  - **Delete:** Remove an item from the list.
  - **Cancel Delete:** Undo the delete action.
  - **Edit:** Modify the details of an item.
  - **Cancel Edit:** Undo the edit action.

## How to Run the Project

1. **Install All Dependencies:**
   ```bash
   npm install
   ```

2. **Run the Project Locally:**
   ```bash
   npm start
   ```
   This will start the project on port 3000.

3. **Run the JSON Server Locally for REST webservices:**
   ```bash
   npm serve
   ```
   This will start the JSON server on port 8000.

4. **Run All Tests:**
   ```bash
   npm test
   ```
