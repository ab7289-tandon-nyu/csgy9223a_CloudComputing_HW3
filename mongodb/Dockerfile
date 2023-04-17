FROM mongo

COPY init_repl_set.js .

EXPOSE 27017

# CMD mongod --replSet rs0 --bind_ip 0.0.0.0 
CMD [ "mongod" ]