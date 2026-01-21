# Portfolio Website

A modern, dark-themed portfolio website with a programmer/developer aesthetic. Built with HTML, CSS, and JavaScript, featuring a responsive design and smooth animations.

## 🚀 Features

- **Dark Theme Design**: Modern dark color scheme with cyan and purple accents
- **Programmer Aesthetic**: Code-style typography and terminal-inspired elements
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Fade-in effects and hover animations throughout
- **Contact Form**: Email integration using EmailJS (with mailto fallback)
- **Project Showcase**: Featured projects section with image overlays
- **Skills Section**: Organized skills display with icons
- **About Section**: Personal information and statistics

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css      # All styling and dark theme
│   ├── js/
│   │   └── script.js       # JavaScript functionality
│   └── img/
│       ├── profile_pic.jpg  # Profile picture
│       ├── poppyz.jpg      # Project images
│       ├── bloompy.jpg
│       └── bluekey.jpg
└── README.md               # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, Animations
- **JavaScript (ES6+)**: Form handling, smooth scrolling, animations
- **EmailJS**: Email service integration (optional)
- **Font Awesome**: Icons
- **Google Fonts**: Inter (sans-serif) and Fira Code (monospace)

## 📦 Setup Instructions

1. **Clone or download** this repository
2. **Open** `index.html` in your web browser
3. **That's it!** The site works immediately

### For Local Development

If you're using XAMPP or similar:
1. Place the portfolio folder in your `htdocs` directory
2. Access via `http://localhost/portfolio/`

## ⚙️ Configuration

### Email Form Setup (Optional but Recommended)

The contact form uses EmailJS to send emails directly from the website. To set it up:

1. **Create an EmailJS account** at [https://www.emailjs.com/](https://www.emailjs.com/)
2. **Add an Email Service**:
   - Go to Email Services
   - Add your email service (Gmail, Outlook, etc.)
   - Note your Service ID
3. **Create an Email Template**:
   - Go to Email Templates
   - Create a new template
   - Use these variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{message}}` - Message content
   - Set "To Email" to: `richardabela@gmail.com`
   - Note your Template ID
4. **Get your Public Key**:
   - Go to Account → API Keys
   - Copy your Public Key
5. **Update `assets/js/script.js`**:
   ```javascript
   // Replace these values:
   emailjs.init("YOUR_PUBLIC_KEY");        // Line ~75
   const serviceID = 'YOUR_SERVICE_ID';    // Line ~100
   const templateID = 'YOUR_TEMPLATE_ID';  // Line ~101
   ```

**Note**: If EmailJS is not configured, the form will use a mailto fallback that opens the user's email client.

## 🎨 Customization

### Colors

Edit the CSS variables in `assets/css/styles.css`:

```css
:root {
    --primary-color: #00d9ff;      /* Cyan accent */
    --secondary-color: #7c3aed;    /* Purple accent */
    --accent-color: #10b981;       /* Green accent */
    --bg-primary: #0a0e27;          /* Main background */
    --bg-secondary: #111827;        /* Secondary background */
    /* ... more variables */
}
```

### Content

1. **Personal Information**: Edit `index.html`
   - Update name, title, description in the hero section
   - Modify about section text
   - Update contact information

2. **Projects**: Add/remove project cards in the projects section
   - Update project images in `assets/img/`
   - Modify project descriptions and tags

3. **Skills**: Update skills in the skills section
   - Change skill categories
   - Update descriptions

4. **Profile Picture**: Replace `assets/img/profile_pic.jpg` with your own image

### Fonts

The site uses:
- **Inter**: Main font (sans-serif)
- **Fira Code**: Code-style elements (monospace)

To change fonts, update the Google Fonts link in `index.html` and CSS font-family declarations.

## 📱 Responsive Breakpoints

- **Desktop**: Default (3 columns for skills, 3 columns for projects)
- **Tablet** (≤768px): 2 columns for skills, 1 column for projects
- **Mobile** (≤480px): 1 column for all sections

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is open source and available for personal use. Feel free to customize it for your own portfolio.

## 👤 Author

**Richard Emmanuel Q. Abela**

- Email: richardabela@gmail.com
- LinkedIn: [Richard Emmanuel Abela](https://www.linkedin.com/in/richard-emmanuel-abela-a6a44462/)
- GitHub: [richardemmanuelabela](https://github.com/richardemmanuelabela/)

## 🙏 Credits

- **Font Awesome**: Icons
- **Google Fonts**: Typography
- **EmailJS**: Email service (optional)
- Design inspired by modern developer portfolios and code editor aesthetics

## 🔧 Troubleshooting

### Form not sending emails?
- Check EmailJS configuration in `assets/js/script.js`
- Verify your EmailJS service and template IDs
- Check browser console for errors
- The mailto fallback should work if EmailJS isn't configured

### Images not displaying?
- Ensure image paths in `index.html` match your file structure
- Check that images exist in `assets/img/` directory
- Verify file names match exactly (case-sensitive)

### Styles not loading?
- Check that `assets/css/styles.css` path is correct
- Clear browser cache
- Verify file structure matches the project structure above

---

**Built with ❤️ for developers**
