require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let newQuery = `a website that allows users to automatically generate a simple website layout with some AI generated content`;

function makePrompt(query) {
  return (
    'REQUEST:\nGiven the following description, return three possible company/website names, a unique two color dark color scheme for the website design, a unique two color light color scheme for the website design, a fitting header font style & a fitting main font style with links to Google Fonts, a company slogan, a Call To Action for the homepage, a description of a possible logo design, and three short paragraphs for the content on the homepage.\nDescription: a website that allows users to rate and tip people who work in the service industry\nRESPONSE IN JSON:\n{\n"names":["Tipster", "Rate-It", "Service-Star"],\n"darkColorScheme":["#2F2F2F", "#3D3D3D", "#96C0B7", "#000000"],\n"lightColorScheme":["#F2F2F2", "#E3E3E3", "#3C91E6", "#FFFFFF"],\n"headerFontStyle": ["https://fonts.google.com/specimen/Quicksand", "Quicksand"],\n"mainFontStyle": ["https://fonts.google.com/specimen/Lato", "Lato"],\n"slogan": "Rate and Tip the Service Industry",\n"callToAction": "Rate and Tip Now!",\n"logoDescription": "A logo design that incorporates a star or other rating symbol, along with a tip jar or other tipping symbol. The logo should be simple and modern, with a combination of the dark and light colors from the color scheme.",\n"homepageContent": ["Welcome to Tipster! We are the premier website for rating and tipping people who work in the service industry. Our goal is to provide a platform for customers to rate and tip service workers, and for service workers to receive recognition for their hard work. With Tipster, you can easily rate and tip service workers in a few simple steps.","At Tipster, we believe that service workers should be rewarded for their hard work. That\'s why we provide a platform for customers to rate and tip service workers. With Tipster, you can easily rate and tip service workers in a few simple steps.","We are committed to providing a safe and secure platform for customers to rate and tip service workers. Our platform is designed to be easy to use and secure, so you can rest assured that your information is safe with us. So what are you waiting for? Sign up now and start rating and tipping service workers today!"]\n}\nREQUEST:\nGiven the following description, return three possible company/website names, a unique two color dark color scheme for the website design, a unique two color light color scheme for the website design, a fitting header font style & a fitting main font style with links to Google Fonts, a company slogan, a Call To Action for the homepage, a description of a possible logo design, and three short paragraphs for the content on the homepage.\nDescription: ' +
    query +
    "\nRESPONSE IN JSON:\n"
  );
}

async function getData(query) {
  const prompt = makePrompt(query);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 3400,
    top_p: 0.9,
    frequency_penalty: 0.5,
    presence_penalty: 0.5,
  });
  let data = response.data.choices[0].text;
  console.log(typeof JSON.parse(data), JSON.parse(data));
  return JSON.parse(data);
}

// getData(newQuery)
let exampleResponse = {
  names: ["GenWeb", "Autogenerate", "Create-Smart"],
  darkColorScheme: ["#2D2D2D", "#4A4A4A", "#9B9B9B", "#000000"],
  lightColorScheme: ["#F6F6F6", "#EFEFEF", "#3D75BE", "#FFFFFF"],
  headerFontStyle: ["https://fonts.google.com/specimen/Mulish", "Mulish"],
  mainFontStyle: ["https://fonts.google.com/specimen/Raleway", "Raleway"],
  slogan: "Create Simple Websites Instantly!",
  callToAction: "Generate Your Website Now!",
  logoDescription:
    "A logo design that incorporates an infinity symbol or other visual representation of automated website generation. The logo should be modern and sleek, with a combination of the dark and light colors from the color scheme.",
  homepageContent: [
    "Welcome to GenWeb! We are the premier website for automatically generating simple websites with AI generated content. Our goal is to provide an easy way for people to create websites with minimal effort and time required.",
    "At GenWeb, we believe that everyone should have access to their own website, regardless of experience or technical skill level. That's why we provide a platform for users to quickly and easily generate their own website with AI generated content.",
    "We are committed to providing a safe and secure platform for users to generate their own website. Our platform is designed to be easy to use and secure, so you can rest assured that your information is safe with us. So what are you waiting for? Sign up now and start generating your website today!",
  ],
};
