#!/bin/sh
SLEEP_TIME=10

echo "Aguardando $SLEEP_TIME segundos antes de iniciar o servidor..."
sleep $SLEEP_TIME

echo "Iniciando o servidor..."
exec npm start