# CBC


Run the app
```
docker-compose up
```

Clear docker:
docker-compose down
docker rm $(docker ps -a -q)
docker volume rm $(docker volume ls -q)
docker rmi $(docker images -a -q)
docker-compose up