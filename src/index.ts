import axios from 'axios';
import puppeteer from 'puppeteer';

(async () => {
	const posts = await axios.get('https://www.reddit.com/r/drumkits.json');
	interface links {
		data: {
			url: string;
		};
	}
	const links: string[] = posts.data.data.children
		.slice(2)
		.map((p: links): string => p.data.url);

	const browser = await puppeteer.launch();
	links.forEach(async (l) => {
		console.log(l);
		const page = await browser.newPage();
		await page.goto(l);
		await page.screenshot({ path: 'screenshots/example.png' });
	});

	// await browser.close();
})();
