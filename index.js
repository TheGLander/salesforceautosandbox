const puppeteer = require("puppeteer")
const config = require("./config.json")
const baseTryItSelector =
	"#operations-Sandboxes-post_sandboxes__sandboxId__operations>div"
/**
 *
 * @param {number} time The time in milliseconds to wait for
 */
function wait(time) {
	return new Promise((resolve) => setTimeout(resolve, time))
}
;(async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto("https://admin.us01.dx.commercecloud.salesforce.com/")
	await (await page.waitForSelector(".btn,authorize")).click()
	let input = (await page.waitForSelector("#client_id")).asElement()
	await input.type(config.clientId)
	await (await page.waitForSelector(".modal-btn")).click()
	await wait(2000)
	//Switch to auth tab
	const authTab = (await browser.pages())[2]
	input = (await authTab.waitForSelector("#idToken1")).asElement()
	await input.type(`${config.login}\n`)
	input = (await authTab.waitForSelector("#idToken2")).asElement()
	await input.type(`${config.password}\n`)
	await wait(3000)
	//Go back to main page and do orders
	await (await page.waitForSelector(".close-modal")).click()
	await (await page.waitForSelector(baseTryItSelector)).click()
	await (
		await page.waitForSelector(
			`${baseTryItSelector}>div>div>.opblock-section-header>div>button`
		)
	).click()
	const operation = process.env.AUTOSALESFORCE_ORDER || "start"
	await (
		await page.waitForSelector(
			`${baseTryItSelector}>div>div>div>table>tbody>tr>td>div>div>div>textarea`
		)
	).evaluate((el, val) => (el.value = `{"operation":"${val}"}`), operation)
	await (
		await page.waitForSelector(
			`${baseTryItSelector}>div>div>div>table>tbody>tr>td>input`
		)
	).type(config.sandboxId)
	await (
		await page.waitForSelector(`${baseTryItSelector}>div>div>.execute`)
	).click()
	await page.waitForSelector(`${baseTryItSelector}>div>div>.btn-clear`)
	await browser.close()
})()
