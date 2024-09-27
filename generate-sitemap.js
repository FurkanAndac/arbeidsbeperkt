const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");

// Define your static routes and their priorities/frequencies
const urls = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  {
    url: "/bedrijven-registratieformulier",
    changefreq: "monthly",
    priority: 0.8,
  },
  { url: "/arbeidsbeperkte-formulier", changefreq: "monthly", priority: 0.8 },
  { url: "/onze-sponsors", changefreq: "monthly", priority: 0.6 },
  { url: "/gdpr", changefreq: "yearly", priority: 0.5 },
  { url: "/cookie-policy", changefreq: "yearly", priority: 0.5 },
  { url: "/doneer", changefreq: "monthly", priority: 0.7 },
  { url: "/authentication/login", changefreq: "yearly", priority: 0.5 },
  { url: "/authentication/signup", changefreq: "yearly", priority: 0.5 },
  {
    url: "/authentication/forgot-password",
    changefreq: "yearly",
    priority: 0.5,
  },
];

// Set the hostname for your sitemap
const sitemap = new SitemapStream({ hostname: "https://arbeidsbeperkt.eu" });

// Create a write stream to output the sitemap to a file
const writeStream = createWriteStream("./public/sitemap.xml");

// Pipe the sitemap stream to the write stream
sitemap.pipe(writeStream);

// Write all the URLs to the sitemap
urls.forEach((url) => sitemap.write(url));

// End the sitemap stream
sitemap.end();

// Log a success message when done
streamToPromise(sitemap)
  .then(() => {
    console.log("Sitemap written successfully.");
  })
  .catch((error) => {
    console.error("Error writing sitemap:", error);
  });
