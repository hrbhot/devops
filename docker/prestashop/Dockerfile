FROM php:7.2-apache

LABEL maintainer="hrbhot@gmail.com"

RUN apt-get update \
	&& apt-get install -y libmcrypt-dev \
		libjpeg62-turbo-dev \
		libpcre3-dev \
		libpng-dev \
		libfreetype6-dev \
		libxml2-dev \
		libicu-dev \
		mariadb-client \
		wget \
		unzip \
		libmagickwand-dev \
		libmemcached-dev \
		zlib1g-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install iconv intl pdo_mysql mbstring soap gd zip mysqli bcmath 

RUN docker-php-source extract \
  && if [ -d "/usr/src/php/ext/mysql" ]; then docker-php-ext-install mysql; fi \
  && if [ -d "/usr/src/php/ext/mcrypt" ]; then docker-php-ext-install mcrypt; fi \
  && if [ -d "/usr/src/php/ext/opcache" ]; then docker-php-ext-install opcache; fi \
  && docker-php-source delete
RUN printf "\n" | pecl install imagick memcached-3.0.3
RUN docker-php-ext-enable imagick memcached


# installs memcached and enables it in apache

#RUN apt-get update && apt-get install -y libmemcached-dev zlib1g-dev \
#    && pecl install memcached-3.0.3 \
#    && docker-php-ext-enable memcached

COPY docker_run.sh /tmp/

# If handle dynamic domain
COPY docker_updt_ps_domains.php /tmp/

# Apache configuration
RUN if [ -x "$(command -v apache2-foreground)" ]; then a2enmod rewrite; fi

# PHP configuration
COPY php.ini /usr/local/etc/php/


CMD ["/tmp/docker_run.sh"]
