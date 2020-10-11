const puppeteer = require("puppeteer")

const debug = process.env.AUTOSALESFORCE_DEBUG === "debug"
const baseTryItSelector =
	"#operations-Sandboxes-post_sandboxes__sandboxId__operations>div"
/**
 *
 * @param {number} time The time in milliseconds to wait for
 */
function wait(time) {
	return new Promise((resolve) => setTimeout(resolve, time))
}
if (debug)
	console.log(
		process.env.CHROMIUM_PATH,
		process.env.AUTOSALESFORCE_CLIENTID,
		process.env.AUTOSALESFORCE_LOGIN,
		process.env.AUTOSALESFORCE_PASSWORD,
		process.env.AUTOSALESFORCE_SANDBOXID,
		process.env.AUTOSALESFORCE_ORDER
	)
;(async () => {
	if (
		!(
			process.env.CHROMIUM_PATH &&
			process.env.AUTOSALESFORCE_CLIENTID &&
			process.env.AUTOSALESFORCE_CLIENTID &&
			process.env.AUTOSALESFORCE_PASSWORD &&
			process.env.AUTOSALESFORCE_SANDBOXID &&
			process.env.AUTOSALESFORCE_ORDER
		)
	) {
		throw new Error(
			"Env missing required variables! Read the README for required variables"
		)
	}

	const browser = await puppeteer.launch({
		executablePath: process.env.CHROMIUM_PATH,
		headless: !debug,
		slowMo: debug ? 100 : 0,
	})

	const page = await browser.newPage()
	await page.goto("https://admin.us01.dx.commercecloud.salesforce.com/")
	await (await page.waitForSelector(".btn,authorize")).click()
	let input = (await page.waitForSelector("#client_id")).asElement()
	await input.type(process.env.AUTOSALESFORCE_CLIENTID)
	await (await page.waitForSelector(".modal-btn")).click()
	await wait(2000)
	page.$
	//Switch to auth tab
	const authTab = (await browser.pages())[2]
	input = (await authTab.waitForSelector("#idToken1")).asElement()
	await input.type(`${process.env.AUTOSALESFORCE_LOGIN}\n`)
	input = (await authTab.waitForSelector("#idToken2")).asElement()
	await input.type(`${process.env.AUTOSALESFORCE_PASSWORD}\n`)
	await wait(3000)
	//Go back to main page and do orders
	await (await page.waitForSelector(".close-modal")).click()
	await (await page.waitForSelector(baseTryItSelector)).click()
	await (
		await page.waitForSelector(
			`${baseTryItSelector}>div>div>.opblock-section-header>div>button`
		)
	).click()
	const operation = process.env.AUTOSALESFORCE_ORDER
	await page.evaluate(
		(sel) => (document.querySelector(sel).value = ""),
		`${baseTryItSelector}>div>div>div>div>table>tbody>tr>td>div>div>div>textarea`
	)
	await (
		await page.waitForSelector(
			`${baseTryItSelector}>div>div>div>div>table>tbody>tr>td>div>div>div>textarea`
		)
	).type(`{"operation":"${operation}"}`)
	await (
		await page.waitForSelector(
			`${baseTryItSelector}>div>div>div>div>table>tbody>tr>td>input`
		)
	).type(process.env.AUTOSALESFORCE_SANDBOXID)
	await (
		await page.waitForSelector(`${baseTryItSelector}>div>div>.execute`)
	).click()
	await page.waitForSelector(`${baseTryItSelector}>div>div>.btn-clear`)
	await wait(1000)
	await browser.close()
})()
