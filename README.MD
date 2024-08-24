# Quran Bot

Quran Bot is a WhatsApp-based application designed to help manage daily Quran reading assignments for a group of participants. It automatically assigns Juz (parts) of the Quran to each participant and sends daily reminders.

## Table of Contents

- [Features](#features)
- [Upcoming Features](#upcoming-features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Features

### Core Functionality
- [x] WhatsApp integration for sending messages
- [x] Daily Juz assignment management
- [x] Web-based admin interface
- [x] Participant management (add, remove, view)
- [x] Custom message template
- [x] Send messages to all participants
- [x] Send messages to individual participants
- [x] Automatic daily update of Juz assignments

### Data Management
- [x] Store participant data in a JSON file
- [x] Store message template in a JSON file
- [x] Load and save data automatically

### User Interface
- [x] Arabic language interface
- [x] Responsive design for mobile and desktop

## Upcoming Features

### Enhanced Functionality
- [ ] Support for multiple reading groups
- [ ] Ability to pause/resume assignments for individual participants
- [ ] Option to set custom start dates for new participants
- [ ] Support for different Quran reading plans (e.g., monthly, quarterly)

### User Experience Improvements
- [ ] Dark mode for the admin interface
- [ ] Multi-language support (English, etc.)
- [ ] User authentication for the admin interface
- [ ] Dashboard with reading progress statistics

### WhatsApp Integration Enhancements
- [ ] Support for participant responses (e.g., marking Juz as read)
- [ ] Automated reminders for participants who haven't confirmed reading
- [ ] Option for participants to request their current assignment via WhatsApp

### Data Management and Reporting
- [ ] Export participant data and reading history to CSV
- [ ] Generate reading progress reports
- [ ] Backup and restore functionality for all data

### Advanced Features
- [ ] Integration with Islamic calendar for special readings on significant days
- [ ] Option to include short Tafsir (explanation) with each Juz assignment
- [ ] Gamification elements (e.g., streaks, achievements) to encourage consistent reading
- [ ] API for third-party integrations

### Technical Improvements
- [ ] Implement unit and integration tests
- [ ] Set up continuous integration/continuous deployment (CI/CD) pipeline
- [ ] Dockerize the application for easier deployment
- [ ] Implement database storage (e.g., MongoDB) for better scalability

## Getting Started

These instructions will help you set up a copy of the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or later)
- npm (usually comes with Node.js)
- A WhatsApp account for the bot

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/quran-bot.git
   ```

2. Navigate to the project directory:
   ```
   cd quran-bot
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your configuration:
   ```
   PORT=3000
   ```

5. Start the server:
   ```
   node server.js
   ```

6. Open a web browser and go to `http://localhost:3000` to access the admin interface.

7. Scan the QR code that appears in the console with your WhatsApp to authenticate the bot.

## Usage

1. Add participants through the web interface by providing their name, phone number, and initial Juz.
2. Customize the message template if desired.
3. Use the interface to send messages to all participants or individual participants.
4. The bot will automatically update Juz assignments daily.

## Contributing

We welcome contributions to the Quran Bot project! Here's how you can help:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
5. Push to the branch (`git push origin feature/AmazingFeature`).
6. Open a Pull Request.

Please make sure to update tests as appropriate and adhere to the code style of the project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

Your Name - [@alilibx](https://twitter.com/alilibx) - alhashimifali@gmail.com

Project Link: [https://github.com/alilibx/quranbot](https://github.com/alilibx/quranbot)

## Acknowledgements

- [WhatsApp Web.js](https://github.com/pedroslopez/whatsapp-web.js)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/)