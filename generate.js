const fs = require('fs')

function read(){
    fs.readFile('./src/config.json', "utf-8", (err, config) => {
        config = JSON.parse(config)
        let rules = config.rules;
        let cssRule = "";
        config.rules.forEach(rule => {
            let preffix = rule.preffix;
            let range = rule.range;
            let step = rule.step;
            let fullName = rule.fullName
            for (let i = range.start; i <= range.end; i += step) {
                cssRule += `.${preffix}-${i}{${fullName}:${i}px}`;
            }
        });
        writeIn(cssRule)
    })
}

function writeIn(cssRule){
    fs.stat("./dist", function (err, stat) {
        if (err) {
            fs.mkdir('./dist')
        } 

        fs.writeFile('./dist/global.css', cssRule, 'utf-8', (err) => {
            if (err) return console.error("保存失败" + err);
            console.log("generate successful")
        })
    }); 
}