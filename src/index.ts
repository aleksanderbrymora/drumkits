import axios from 'axios';
import { launch, devices } from 'puppeteer';
import * as fs from 'fs';
import { join } from 'path';

const main = async () => {
	await cleanUpScreenshoots();
	const links = await getAllLinks();
	await goToSites(links);
};

interface selector {
	downloadButton: string;
	website: string;
}

const pages: selector[] = [
	{
		downloadButton: '[aria-label="Download"]',
		website: 'google',
	},
	{
		downloadButton: '[aria-label="Download file"]',
		website: 'mediafire',
	},
	{
		downloadButton: 'a.dl-browser',
		website: 'mega.nz',
	},
];

const goToSites = async (links: string[]) => {
	const browser = await launch();
	let i = 0;
	let link: string;
	for (link of links) {
		console.log('Now looking at:', link, '\n=================');
		const page = await browser.newPage();
		await page.emulate(devices['iPhone 6']);
		try {
			await page.goto(link);
			const pageType: selector | undefined = pages.find((p) =>
				link.includes(p.website),
			);
			if (pageType) {
				await page.waitForSelector(pageType.downloadButton);
				await page.screenshot({
					path: `dist/screenshots/${i}.png`,
					fullPage: true,
				});
				i++;
			}
		} catch (error) {
			console.error(error);
		}
	}
	await browser.close();
};

const getAllLinks = async () => {
	try {
		const posts = await axios.get('https://www.reddit.com/r/drumkits.json');
		interface links {
			data: {
				url: string;
			};
		}
		const links = posts.data.data.children
			.slice(2)
			.map((p: links): string => p.data.url);

		console.log(links);
		return links;
	} catch (err) {
		throw new Error(err);
	}
};

const cleanUpScreenshoots = async () => {
	const directory = 'dist/screenshots';

	fs.readdir(directory, (err, files) => {
		if (err) throw err;

		for (const file of files) {
			fs.unlink(join(directory, file), (err) => {
				if (err) throw err;
			});
		}
	});
};

main();
