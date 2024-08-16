FROM php:7.2-apache

# Install mod_ssl, create SSL directory, and generate a self-signed certificate
RUN apt-get update && \
    apt-get install -y libapache2-mod-security2 openssl && \
    a2enmod ssl && \
    mkdir -p /etc/apache2/ssl && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/apache2/ssl/apache.key \
    -out /etc/apache2/ssl/apache.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/OU=Department/CN=localhost"

# Modify the SSL configuration file
RUN sed -i 's/SSLCertificateFile.*/SSLCertificateFile \/etc\/apache2\/ssl\/apache.crt/' /etc/apache2/sites-available/default-ssl.conf && \
    sed -i 's/SSLCertificateKeyFile.*/SSLCertificateKeyFile \/etc\/apache2\/ssl\/apache.key/' /etc/apache2/sites-available/default-ssl.conf && \
    a2ensite default-ssl

# Copy application files and set permissions
COPY . /var/www/html
WORKDIR /var/www/html
RUN chmod -R 777 /var/www/html/*

# Ensure Apache runs in the foreground with proper config
CMD ["apache2-foreground"]
