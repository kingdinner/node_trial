  const express = require('express');
  const hbs = require('hbs');
  const fs = require('fs');
 
  const port = process.env.PORT || 3000;
  var app = express();



  hbs.registerPartials(__dirname + '/views/partials');

  hbs.registerHelper('getCurrentYear', ()=>{
  		return new Date().getFullYear()
  });

  hbs.registerHelper('screamIt', (text)=>{
  		return text.toUpperCase();
  });

  app.set('view engine','hbs');


 //  app.use((req,res,next) =>{
	// res.render('maintenace',{
	// 		PageTitle: 'maintenace'
	// 	});
	// });
  app.use((req,res,next) =>{
  	var now = new Date().toString();
  	var log = `${now}: ${req.method} ${req.url}`;

  	console.log(log);
  	fs.appendFile('server.log', log + '\n', (err) =>{
  		if (err){
  			console.log('Unable to append to server log');
  		}
  	});
  	next();
  });

  app.get('/',(req,res)=>{
      // res.send('<H1>hello express! king</H1>');
  		res.render('new.hbs',{
  			PageTitle:'New Page',
 			welcomeMessage:'Welcome to my website'
  			
  		});
  });
    app.use(express.static(__dirname + '/public'));

  app.get('/about',(req,res) =>{
  		res.render('about.hbs',{
  			PageTitle:'About page',
  			
  		});
  		
  });

  app.listen(port, () =>{
  	console.log('Server is up');
  });