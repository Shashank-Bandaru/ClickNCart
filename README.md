# ClickNCart : E-Commerce Website

ClickNCart is a fully functional e-commerce website developed using the MERN (MongoDB, Express.js, React, Node.js) stack. The platform offers a seamless shopping experience with features like user authentication, shopping cart functionality, PayPal payment integration, and more. It is designed for both users and administrators, with separate views and functionalities for each role.

## Features

- **User Authentication**: Secure login and registration system with password encryption.
- **Admin/User Views**: Role-based access, allowing admin users to manage products, orders, and users, while standard users can browse, purchase products, and view their orders.
- **Redux Toolkit**: Efficient state management for the entire application.
- **Shopping Cart**: Add, update, and remove items from the shopping cart.
- **Order Management**: Place orders, view order history, and track order status.
- **User Reviews and Ratings**: Leave reviews and ratings for purchased products.
- **Toast Notifications**: Real-time notifications for important actions like adding items to the cart or placing orders.
- **Responsive Design**: Fully responsive UI built with HTML, CSS, and JavaScript for optimal performance across devices.
- **PayPal Integration**: Secure online payments powered by PayPal.
  
## Tech Stack

- **Frontend**: 
  - React.js
  - Redux Toolkit for state management
  - HTML5, CSS3, JavaScript (ES6+)
  - Axios for making API requests
  - React Router for navigation
  
- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB with Mongoose ORM
  - JWT (JSON Web Token) for user authentication
  - Bcrypt.js for password encryption
  
- **Payment Gateway**: 
  - PayPal API for secure payments

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/ClickNCart.git
    ```
   
2. Navigate to the project directory:
    ```bash
    cd ClickNCart
    ```

3. Install dependencies for both frontend and backend:
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```
4. Create a 'uploads'  folder in the root directory (The uploaded product images will be stored here).

5. Create a `.env` file in the root of your `backend` directory and add the following environment variables:
    ```bash
    PORT_NUMBER=5000
    MONGODB_URL=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret
    DIRECTORY_PATH = your_root_directory_path
    ```
6. Create a `.env` file in the root of your `backend` directory and add the following environment variables:
    ```bash
    REACT_APP_LINK = http://localhost:5000
    PAYPAL_CLIENT_ID= your_paypal_client_id 
    ```    

7. Run the application:
    ```bash
    # Run backend
    npm start

    # Run frontend
    cd frontend
    npm start
    ```

8. The website should now be running at `http://localhost:3000`.

## Usage

- **User Side**:
  - Sign up or log in with an existing account.
  - Browse through products, add them to the cart, and proceed to checkout.
  - Complete the purchase securely using PayPal.
  - Leave reviews and ratings for products.

- **Admin Side**:
  - Manage the categories, including adding, updating, and deleting categories.
  - Manage products, including adding, updating, and deleting items.
  - View and manage all user orders.
  

## Screenshots

![Homepage](https://i.postimg.cc/15mnrJRx/Screenshot-2024-09-02-122102.png)
![Product Page](https://i.postimg.cc/y8WDwxSv/Screenshot-2024-09-02-122146.png)

## Demonstration Video

Please check the demonstration video of my website from this [demonstration_video_link](https://drive.google.com/file/d/1xBzw4QbIickVfmWQ2cPUeQXJiegximM-/view?usp=sharing)

## Contributing

Feel free to fork this repository and submit pull requests to enhance the platform or fix any issues.

## Contact

For any inquiries, please contact me at:
- **Email**: bandarushashank8@gmail.com
- **GitHub**: [Shashank-Bandaru](https://github.com/Shashank-Bandaru)
