# start compose
dev:
	docker-compose -f docker-compose.yml -f docker-compose.development.yml up -d --build

stop:
	docker-compose down

prod:
	docker-compose up --build

# dev commands
server-logs:
	docker logs learn-eng-server --follow

client-logs:
	docker logs learn-eng-client --follow

# (insert | clear) db inside container
import-db-data:
	docker exec -it learn-eng-server sh -c "node src/dev-data/importData.js --import"

delete-db-data:
	docker exec -it learn-eng-server sh -c "node src/dev-data/importData.js --delete"
