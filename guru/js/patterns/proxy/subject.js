// some core business logic
class Subject {
  // both Subject and Proxy must have this interface,
  // so it can be passed to Proxy instead of real Subject
  request() {
    console.log('Subject: handling request.');
  }
}

export { Subject };
