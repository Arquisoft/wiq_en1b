async function register(page, email, username, password) {
    await page.goto('http://localhost:3000/addUser'); 
    await page.waitForSelector('.general');

    await page.type('input[name="email"]', email);
    await page.type('input[name="username"]', username);
    await page.type('input[name="password"]', password);
    await page.type('input[name="repeat_password"]', password);
    await page.click('button[type="submit"]');
    //Wait for menu to load
    await page.waitForSelector('.divMenu');
}

async function login(page, username, password) {
    await page.goto('http://localhost:3000/login'); 
    await page.waitForSelector('.general');

    await page.type('input[type="text"]', username);
    await page.type('input[type="password"]', password);
    await page.click('button[type="submit"]');
    //Wait for menu to load
    await page.waitForSelector('.divMenu');
}

async function logout(page){
    await page.click('.user-button');
    await page.waitForSelector('.MuiMenu-paper', { visible: true });
    await page.click('text=Log Out');
    //Wait for home to load
    await page.waitForSelector('.general');
}

module.exports = {
    register,
    login,
    logout
  };