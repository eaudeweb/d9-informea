FROM cristiroma/nginx-php-fpm:php73

COPY .docker/app/heavy-lifter.conf /etc/nginx/conf.d/snippets/heavy-lifter.conf
COPY drush drush
COPY patches patches
COPY load.environment.php composer.json composer.lock composer.patches.json RoboFile.php /usr/share/nginx/html/
COPY config config
COPY scripts scripts
COPY web web

# We need sudo for CRON, .env for composer errors
RUN composer self-update --2 && composer install && touch .env
