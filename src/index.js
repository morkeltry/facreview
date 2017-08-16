const app = require('./app');

console.log('app:', typeof app);
app.listen(app.get('port'), () => {
    console.log('App running on port', app.get('port'));
});
