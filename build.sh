echo 'INSTALLING ADONIS'
npm i -g @adonisjs/cli
echo 'RUNNING MIGRATIONS'
adonis migration:run
echo 'SERVING APPLICATION'
adonis serve
