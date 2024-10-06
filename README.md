# Social Media Content Generator

## Overview
The **Social Media Content Generator** is a React-based application that automates social media content creation using OpenAI's API. It seamlessly integrates with social media platforms such as Facebook, Instagram, and Twitter, allowing users to generate, customize, and publish posts directly from the app. 

The app is secured using AWS Amplify Authentication with role-based access control provided by AWS IAM. Serverless functions, written in Python, handle backend operations using AWS Lambda and AWS API Gateway to perform CRUD operations on an AWS RDS (MySQL) database.

## Video Demo

https://github.com/user-attachments/assets/d8c36846-4c72-439d-a563-8a72f1d9333c

## Features
- **Content Generation**: Automatically generate content based on user input using OpenAI's API.
- **Social Media Integration**: Post directly to Facebook, Instagram, and Twitter through integrated APIs.
- **User Authentication**: Secured authentication using AWS Amplify and AWS IAM for role-based access control.
- **Serverless Backend**: Perform scalable CRUD operations via AWS Lambda (Python) and AWS API Gateway.
- **Database**: AWS RDS (MySQL) used for storing user data and campaign history.
- **Testing**: Unit tests with Jest and end-to-end testing with Cypress to ensure functionality and robustness.

## Tech Stack
- **Frontend**: TypeScript, React, Node.js
- **Backend**: AWS Lambda (Python), AWS API Gateway
- **Database**: AWS RDS (MySQL)
- **Authentication**: AWS Amplify Auth, AWS IAM
- **APIs**: OpenAI API, Facebook API, Instagram API, Twitter API
- **Testing**: Jest (Unit Tests), Cypress (End-to-End Tests)

## New Things I Learned
- **AWS Amplify Authentication:** Implemented user authentication and role-based access control, learning how to configure user pools and manage authentication flows.
- **Social Media API Integration:** Gained experience working with multiple APIs (Facebook, Instagram, Twitter) to allow users to post content directly from the app.
- **AWS Lambda & API Gateway:** Improved my understanding of building serverless functions in Python and linking them with API Gateway for secure CRUD operations.
