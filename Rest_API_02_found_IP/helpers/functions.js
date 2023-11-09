function findCountryByIP(ipAddress, ipRanges) {
  const numericIP = ipToNumeric(ipAddress);

  for (const ipRange of ipRanges) {
    const from = Number(ipRange.from);
    const to = Number(ipRange.to);

    if (numericIP >= from && numericIP <= to) {
      return {
        IP: ipAddress,
        country: ipRange.country,
        countryName: ipRange.countryFullName,
      };
    }
  }

  return null;
}

function ipToNumeric(ipAddress) {
  const parts = ipAddress.split(".");
  if (parts.length !== 4) {
    return 0;
  }
  return (
    (parseInt(parts[0]) << 24) |
    (parseInt(parts[1]) << 16) |
    (parseInt(parts[2]) << 8) |
    parseInt(parts[3])
  );
}

module.exports = findCountryByIP;
