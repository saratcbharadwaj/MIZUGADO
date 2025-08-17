# MIZUGADO - AI-Powered Smart Contract Auditing Tool

MIZUGADO is a full-stack, microservice-based web application designed to audit Solidity smart contracts for potential vulnerabilities using a custom-trained AI model. This project demonstrates a complete DevOps workflow, integrating a modern frontend, a robust backend, a dedicated machine learning service, and a persistent database, all orchestrated with Docker.

## 🏛️ Architecture & Tech Stack

The application is built on a microservice architecture to ensure scalability and separation of concerns. Each component runs in its own Docker container and communicates over a shared network.

| Component  | Technology      | Description |
|------------|----------------|-------------|
| Frontend   | React (Vite)   | A modern, responsive user interface for pasting smart contract code and viewing analysis results. |
| Backend    | Java (Spring Boot) | A robust REST API that handles user authentication, manages requests, and communicates with the AI service and database. |
| AI Service | Python (FastAPI) | A dedicated API that serves a fine-tuned roberta-base model for performing vulnerability analysis on the submitted code. |
| Database   | MySQL          | A persistent database for storing user information and other application data. |
| Orchestration | Docker Compose | Manages the entire multi-container application, including networking and persistent data volumes. |

## 🧠 AI Model Details

The AI model is a fine-tuned version of roberta-base specifically trained for smart contract vulnerability detection. The model was trained on the smartbugs_wild dataset after applying undersampling techniques to resolve a severe class imbalance, ensuring more reliable and nuanced predictions.

- **Model Link**: [HuggingFace - hoomancat/mizu-gado](https://huggingface.co/hoomancat/mizu-gado)

### Initial Training Results (On Imbalanced Data)

The initial training run on the original, imbalanced dataset produced the following metrics. These results were a key diagnostic indicator of the dataset's severe skew towards "vulnerable" examples.

| Epoch | Training Loss | Validation Loss | Accuracy | F1 Score | Precision | Recall |
|-------|---------------|-----------------|----------|----------|-----------|--------|
| 1.0   | 0.2357        | 0.2351          | 0.9397   | 0.9689   | 0.9397    | 1.0000 |
| 2.0   | 0.2292        | 0.2325          | 0.9397   | 0.9689   | 0.9397    | 1.0000 |
| 3.0   | 0.2396        | 0.2314          | 0.9397   | 0.9689   | 0.9397    | 1.0000 |

The **100% recall score** indicated that the model had adopted a simple strategy of always predicting "vulnerable," successfully identifying the data imbalance issue and necessitating the retraining on a balanced dataset.

## 🚀 Getting Started

This guide provides instructions for setting up and running the entire application on your local machine.

### ✅ Prerequisites

Before you begin, ensure you have the following software installed on your system:
- **Java Development Kit (JDK):** Version 17 or higher
- **Docker:** Docker Desktop must be installed and running
- **Git:** For cloning the repository

### ⚙️ Installation and Setup

#### Step 1: Clone the Repository
```bash
git clone https://github.com/saratcbharadwaj/MIZUGADO.git
cd MIZUGADO
```

#### Step 2: Build the Java Backend
```bash
cd backend
# For Linux or macOS:
./mvnw clean install

# For Windows (Command Prompt or PowerShell):
.\mvnw.cmd clean install
```

This will compile the code and create the necessary executable file in the `target/` directory.

#### Step 3: Return to the Project Root
```bash
cd ..
```

#### Step 4: Launch the Application with Docker Compose
```bash
docker-compose up --build
```

### 🔎 Verification
Run the following command to check if all containers are running:
```bash
docker ps
```

You should see `mizugado-frontend`, `mizugado-backend`, `mizugado-api`, and `mizugado-db`.

### 🖥️ Accessing the Application
Open your web browser and navigate to: [http://localhost:3000](http://localhost:3000)
