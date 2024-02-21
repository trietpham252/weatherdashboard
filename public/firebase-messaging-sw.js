this.addEventListener('push', event => {
    const options = {
      body: event.data.text(),
      icon: '/public/favicon.ico', 
    };
    event.waitUntil(
      this.registration.showNotification('Your App Name', options)
    );
    console.log(options);
});
