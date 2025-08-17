MIZUGADO - AI-Powered Smart Contract Auditing Tool

MIZUGADO is a full-stack, microservice-based web application designed to audit Solidity smart contracts for potential vulnerabilities using a custom-trained AI model. This project demonstrates a complete DevOps workflow, integrating a modern frontend, a robust backend, a dedicated machine learning service, and a persistent database, all orchestrated with Docker.
🏛️ Architecture & Tech Stack

The application is built on a microservice architecture to ensure scalability and separation of concerns. Each component runs in its own Docker container and communicates over a shared network.

Component
	

Technology
	

Description

Frontend
	

React (Vite)
	

A modern, responsive user interface for pasting smart contract code and viewing analysis results.

Backend
	

Java (Spring Boot)
	

A robust REST API that handles user authentication, manages requests, and communicates with the AI service and database.

AI Service
	

Python (FastAPI)
	

A dedicated API that serves a fine-tuned roberta-base model for performing vulnerability analysis on the submitted code.

Database
	

MySQL
	

A persistent database for storing user information and other application data.

Orchestration
	

Docker Compose
	

Manages the entire multi-container application, including networking and persistent data volumes.
🧠 AI Model Details

The AI model is a fine-tuned version of roberta-base specifically trained for smart contract vulnerability detection. The model was trained on the smartbugs_wild dataset after applying undersampling techniques to resolve a severe class imbalance, ensuring more reliable and nuanced predictions.

    Model Link: You can find the model on the Hugging Face Hub here: hoomancat/mizu-gado

🚀 Getting Started

This guide provides instructions for setting up and running the entire application on your local machine.
✅ Prerequisites

Before you begin, ensure you have the following software installed on your system:

    Java Development Kit (JDK): Version 17 or higher.

    Docker: Docker Desktop must be installed and running.

    Git: For cloning the repository.

⚙️ Installation and Setup

Follow these steps in order to build and run the application.
Step 1: Clone the Repository

First, clone the project repository to your local machine.

git clone https://github.com/saratcbharadwaj/MIZUGADO.git
cd MIZUGADO

Step 2: Build the Java Backend

The Spring Boot backend needs to be compiled into a .jar file before Docker can build the final image.

Navigate to the backend directory:

cd backend

Now, run the Maven wrapper script to build the project. The command is different depending on your operating system.

    For Linux or macOS:

    ./mvnw clean install

    For Windows (Command Prompt or PowerShell):

    .\mvnw.cmd clean install

This will compile the code and create the necessary executable file in the target/ directory.
Step 3: Return to the Project Root

Once the backend build is complete, navigate back to the root directory of the project.

cd ..

Step 4: Launch the Application with Docker Compose

Now you can build the Docker images for all services and launch the entire application with a single command.

docker-compose up --build

This command will start the frontend, the newly-built backend, the AI service, and the database. It may take a few minutes the first time as Docker downloads the necessary base images.
🔎 Verification

The application should now be running. To verify that all services have started correctly, open a new terminal tab or window and run the following command:

docker ps

You should see a list of running containers, including mizugado-frontend, mizugado-backend, mizugado-api, and mizugado-db.
🖥️ Accessing the Application

Once all containers are running, you can access the web interface:

    Open your web browser and navigate to http://localhost:3000.

You should now see the MIZUGADO login page. Congratulations, the setup is complete!
