module.exports = attributes => {
    if (attributes["urn:resource-id"] !== "urn:path:hello") {
        return "PASS";
    }

    return "urn:attr:name" in attributes ? "PASS" : "DENY";
}
