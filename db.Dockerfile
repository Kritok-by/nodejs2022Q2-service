FROM postgres:alpine

# COPY ./prisma/*.sql /docker-entrypoint-initdb.d/
# RUN chmod a+r /docker-entrypoint-initdb.d/*