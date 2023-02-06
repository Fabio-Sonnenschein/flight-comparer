connection = Mongo('mongodb://127.0.0.1:27017/?readPreference=primary&directConnection=true&ssl=false');
db = connection.getDB('flight-comparer');
db.createCollection('airport', {
  validator: {
    $jsonSchema: {
      required: ['code', 'position'],
      properties: {
        code: {
          bsonType: 'string'
        },
        name: {
          bsonType: 'string'
        },
        location: {
          bsonType: 'object',
          properties: {
            city: {
              bsonType: 'string'
            },
            country: {
              bsonType: 'string'
            },
            countryA2: {
              bsonType: 'string'
            }
          }
        },
        position: {
          bsonType: 'object',
          properties: {
            latitude: {
              bsonType: 'number'
            },
            longitude: {
              bsonType: 'number'
            }
          }
        },
        lounges: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            properties: {
              name: {
                bsonType: 'string'
              },
              airlines: {
                bsonType: 'array',
                items: {
                  bsonType: 'objectId'
                }
              },
              access: {
                bsonType: 'string'
              },
              location: {
                bsonType: 'string'
              },
              type: {
                bsonType: 'string'
              },
              shower: {
                bsonType: 'bool'
              },
              description: {
                bsonType: 'string'
              }
            }
          }
        }
      }
    }
  },
  validationLevel: 'strict',
  validationAction: 'warn'
});

db.createCollection('airline', {
  validator: {
    $jsonSchema: {
      required: ['code'],
      properties: {
        alliance: {
          bsonType: 'string'
        },
        code: {
          bsonType: 'string'
        },
        name: {
          bsonType: 'string'
        }
      }
    }
  },
  validationLevel: 'strict',
  validationAction: 'warn'
});

db.createCollection('flight', {
  validator: {
    $jsonSchema: {
      required: ['airline', 'number', 'departure', 'arrival'],
      properties: {
        airline: {
          bsonType: 'objectId'
        },
        number: {
          bsonType: 'number'
        },
        aircraft: {
          bsonType: 'string'
        },
        cabin: {
          bsonType: 'string'
        },
        departure: {
          bsonType: 'object',
          properties: {
            airport: {
              bsonType: 'objectId'
            },
            time: {
              bsonType: 'object',
              properties: {
                time: {
                  bsonType: 'date'
                },
                zone: {
                  bsonType: 'string'
                },
                utc: {
                  bsonType: 'date'
                }
              }
            }
          }
        },
        duration: {
          bsonType: 'number'
        },
        overnight: {
          bsonType: 'bool'
        },
        arrival: {
          bsonType: 'object',
          properties: {
            airport: {
              bsonType: 'objectId'
            },
            time: {
              bsonType: 'object',
              properties: {
                time: {
                  bsonType: 'date'
                },
                zone: {
                  bsonType: 'string'
                },
                utc: {
                  bsonType: 'date'
                }
              }
            }
          }
        }
      }
    }
  },
  validationLevel: 'strict',
  validationAction: 'warn'
});

db.createCollection('stop', {
  validator: {
    $jsonSchema: {
      properties: {
        arrival: {
          bsonType: 'object',
          properties: {
            airport: {
              bsonType: 'objectId'
            },
            time: {
              bsonType: 'object',
              properties: {
                time: {
                  bsonType: 'date'
                },
                zone: {
                  bsonType: 'string'
                },
                utc: {
                  bsonType: 'date'
                }
              }
            }
          }
        },
        duration: {
          bsonType: 'number'
        },
        overnight: {
          bsonType: 'bool'
        },
        connection: {
          bsonType: 'bool'
        },
        switchAirport: {
          bsonType: 'bool'
        },
        departure: {
          bsonType: 'object',
          properties: {
            airport: {
              bsonType: 'objectId'
            },
            time: {
              bsonType: 'object',
              properties: {
                time: {
                  bsonType: 'date'
                },
                zone: {
                  bsonType: 'string'
                },
                utc: {
                  bsonType: 'date'
                }
              }
            }
          }
        }
      }
    }
  },
  validationLevel: 'strict',
  validationAction: 'warn'
});

db.createCollection('trip', {
  validator: {
    $jsonSchema: {
      required: ['code', 'position'],
      properties: {
        name: {
          bsonType: 'string'
        },
        description: {
          bsonType: 'string'
        },
        vendor: {
          bsonType: 'string'
        },
        link: {
          bsonType: 'string'
        },
        airlines: {
          bsonType: 'array',
          items: {
            bsonType: 'objectId'
          }
        },
        cost: {
          bsonType: 'object',
          properties: {
            price: {
              bsonType: 'number'
            },
            currency: {
              bsonType: 'string'
            }
          }
        },
        nodes: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            properties: {
              type: {
                bsonType: 'string'
              },
              node: {
                bsonType: 'objectId'
              },
              endpoint: {
                bsonType: 'bool'
              }
            }
          }
        },
        departure: {
          bsonType: 'object',
          properties: {
            airport: {
              bsonType: 'objectId'
            },
            time: {
              bsonType: 'object',
              properties: {
                time: {
                  bsonType: 'date'
                },
                zone: {
                  bsonType: 'string'
                },
                utc: {
                  bsonType: 'date'
                }
              }
            }
          }
        },
        arrival: {
          bsonType: 'object',
          properties: {
            airport: {
              bsonType: 'objectId'
            },
            time: {
              bsonType: 'object',
              properties: {
                time: {
                  bsonType: 'date'
                },
                zone: {
                  bsonType: 'string'
                },
                utc: {
                  bsonType: 'date'
                }
              }
            }
          }
        }
      }
    }
  },
  validationLevel: 'strict',
  validationAction: 'warn'
});


// Adds base data to the database
// Airlines and Airports that can be used without having to add them manually


let airlines = [
  {
    alliance: 'Star Alliance',
    code: 'AC',
    name: 'Air Canada'
  },
  {
    alliance: 'SkyTeam',
    code: 'AF',
    name: 'Air France'
  },
  {
    alliance: 'Star Alliance',
    code: 'NZ',
    name: 'Air New Zealand'
  },
  {
    alliance: 'Oneworld',
    code: 'AS',
    name: 'Alaska Airlines'
  },
  {
    alliance: 'Oneworld',
    code: 'AA',
    name: 'American Airlines'
  },
  {
    alliance: 'Star Alliance',
    code: 'NH',
    name: 'ANA'
  },
  {
    alliance: 'Oneworld',
    code: 'BA',
    name: 'British Airways'
  },
  {
    alliance: 'Oneworld',
    code: 'CX',
    name: 'Cathay Pacific'
  },
  {
    alliance: '',
    code: 'DE',
    name: 'Condor'
  },
  {
    alliance: 'SkyTeam',
    code: 'DL',
    name: 'Delta'
  },
  {
    alliance: '',
    code: 'EK',
    name: 'Emirates'
  },
  {
    alliance: '',
    code: 'EY',
    name: 'Etihad'
  },
  {
    alliance: '',
    code: 'EW',
    name: 'Eurowings'
  },
  {
    alliance: 'Oneworld',
    code: 'AY',
    name: 'Finnair'
  },
  {
    alliance: '',
    code: 'HA',
    name: 'Hawaiian Airlines'
  },
  {
    alliance: 'Oneworld',
    code: 'IB',
    name: 'Iberia'
  },
  {
    alliance: '',
    code: 'FI',
    name: 'Icelandair'
  },
  {
    alliance: 'SkyTeam',
    code: 'KL',
    name: 'KLM'
  },
  {
    alliance: 'SkyTeam',
    code: 'KE',
    name: 'Korean Air'
  },
  {
    alliance: 'Oneworld',
    code: 'LA',
    name: 'LATAM'
  },
  {
    alliance: 'Star Alliance',
    code: 'LH',
    name: 'Lufthansa'
  },
  {
    alliance: 'Oneworld',
    code: 'QF',
    name: 'Qantas'
  },
  {
    alliance: 'Oneworld',
    code: 'QR',
    name: 'Qatar Airways'
  },
  {
    alliance: 'Star Alliance',
    code: 'SK',
    name: 'SAS'
  },
  {
    alliance: 'Star Alliance',
    code: 'SQ',
    name: 'Singapore Airlines'
  },
  {
    alliance: 'Star Alliance',
    code: 'LX',
    name: 'SWISS'
  },
  {
    alliance: 'Star Alliance',
    code: 'TP',
    name: 'TAP Portugal'
  },
  {
    alliance: 'Star Alliance',
    code: 'TK',
    name: 'Turkish Airlines'
  },
  {
    alliance: 'Star Alliance',
    code: 'UA',
    name: 'United'
  },
  {
    alliance: '',
    code: 'VS',
    name: 'Virgin Atlantic'
  },
  {
    alliance: '',
    code: 'VA',
    name: 'Virgin Australia'
  }
];

let airlineIDs = db.airline.insertMany(airlines).insertedIds;
printjson(airlineIDs);


let airports = [
  {
    code: 'DUS',
    name: 'Düsseldorf Airport',
    location: {
      city: 'Düsseldorf',
      country: 'Germany',
      countryA2: 'DE'
    },
    position: {
      latitude: 51.278266492972115,
      longitude: 6.767191886901856
    },
    lounges: [
      {
        name: 'Lufthansa Business Lounge',
        airlines: [
          airlineIDs[20]
        ],
        access: 'Lufthansa or Star Alliance Business Class',
        location: 'Terminal A',
        type: 'Regional',
        shower: false,
        description: 'after security check'
      },
      {
        name: 'Lufthansa Senator Lounge',
        airlines: [
          airlineIDs[20]
        ],
        access: 'Lufthansa Senator+, Star Alliance Gold',
        location: 'Terminal A',
        type: 'Regional',
        shower: false,
        description: 'after security check'
      },
      {
        name: 'Emirates Lounge',
        airlines: [
          airlineIDs[10]
        ],
        access: 'Emirates Business Class',
        location: 'Terminal C',
        type: 'International',
        shower: true,
        description: 'Non-Schengen Terminal, after security check'
      }
    ]
  },
  {
    code: 'FRA',
    name: 'Frankfurt Airport',
    location: {
      city: 'Frankfurt',
      country: 'Germany',
      countryA2: 'DE'
    },
    position: {
      latitude: 50.05026389662079,
      longitude: 8.572189807891847
    }
  },
  {
    code: 'MUC',
    name: 'Munich International Airport - Franz Josef Strauß',
    location: {
      city: 'Munich',
      country: 'Germany',
      countryA2: 'DE'
    },
    position: {
      latitude: 48.353767979773714,
      longitude: 11.786184310913088
    }
  },
  {
    code: 'AMS',
    name: 'Amsterdam Airport Schiphol',
    location: {
      city: 'Amsterdam',
      country: 'Netherlands',
      countryA2: 'NL'
    },
    position: {
      latitude: 52.309390414950414,
      longitude: 4.7621870040893555
    }
  },
  {
    code: 'CDG',
    name: 'Paris Charles de Gaulle Airport',
    location: {
      city: 'Paris',
      country: 'France',
      countryA2: 'FR'
    },
    position: {
      latitude: 49.00400468728047,
      longitude: 2.5710260868072514
    }
  },
  {
    code: 'MAD',
    name: 'Adolfo Suárez Madrid-Barajas Airport',
    location: {
      city: 'Madrid',
      country: 'Spain',
      countryA2: 'ES'
    },
    position: {
      latitude: 40.46814,
      longitude: -3.56865
    }
  },
  {
    code: 'LIS',
    name: 'Humberto Delgado Airport',
    location: {
      city: 'Lisbon',
      country: 'Portugal',
      countryA2: 'PT'
    },
    position: {
      latitude: 38.76859815279576,
      longitude: -9.128233194351198
    }
  },
  {
    code: 'LHR',
    name: 'Heathrow Airport',
    location: {
      city: 'London',
      country: 'United Kingdom of Great Britain and Northern Ireland (the)',
      countryA2: 'GB'
    },
    position: {
      latitude: 51.471787130150204,
      longitude: -0.4542589187622071
    }
  },
  {
    code: 'DOH',
    name: 'Hamad International Airport',
    location: {
      city: 'Doha',
      country: 'Qatar',
      countryA2: 'QA'
    },
    position: {
      latitude: 25.261211333820317,
      longitude: 51.61364078521729
    }
  },
  {
    code: 'DXB',
    name: 'Dubai International Airport',
    location: {
      city: 'Dubai',
      country: 'United Arab Emirates (the)',
      countryA2: 'AE'
    },
    position: {
      latitude: 25.25047950172038,
      longitude: 55.37109375000001
    }
  },
  {
    code: 'SIN',
    name: 'Singapore Changi Airport',
    location: {
      city: 'Singapore',
      country: 'Singapore',
      countryA2: 'SG'
    },
    position: {
      latitude: 1.35591246894098,
      longitude: 103.98796677589418
    }
  },
  {
    code: 'BNE',
    name: 'Brisbane Airport',
    location: {
      city: 'Brisbane',
      country: 'Australia',
      countryA2: 'AU'
    },
    position: {
      latitude: -27.385235063255422,
      longitude: 153.1203716251704
    }
  },
  {
    code: 'SYD',
    name: 'Sydney Kingsford Smith Airport',
    location: {
      city: 'Sydney',
      country: 'Australia',
      countryA2: 'AU'
    },
    position: {
      latitude: -33.935384693959776,
      longitude: 151.16621017456058
    }
  },
  {
    code: 'AKL',
    name: 'Auckland Airport',
    location: {
      city: 'Auckland',
      country: 'New Zealand',
      countryA2: 'NZ'
    },
    position: {
      latitude: -37.005534327029864,
      longitude: 174.7835111618042
    }
  },
  {
    code: 'HND',
    name: 'Haneda International Airport',
    location: {
      city: 'Tokyo',
      country: 'Japan',
      countryA2: 'JP'
    },
    position: {
      latitude: 35.549974399875545,
      longitude: 139.78640198707583
    }
  },
  {
    code: 'YVR',
    name: 'Vancouver International Airport',
    location: {
      city: 'Vancouver',
      country: 'Canada',
      countryA2: 'CA'
    },
    position: {
      latitude: 49.194914183286116,
      longitude: -124.8207955360413
    }
  },
  {
    code: 'YYC',
    name: 'Calgary International Airport',
    location: {
      city: 'Calgary',
      country: 'Canada',
      countryA2: 'CA'
    },
    position: {
      latitude: 51.1303602931277,
      longitude: -115.99201917648318
    }
  },
  {
    code: 'YYZ',
    name: 'Toronto Pearson International Airport',
    location: {
      city: 'Toronto',
      country: 'Canada',
      countryA2: 'CA'
    },
    position: {
      latitude: 43.680628929123934,
      longitude: -80.3878736495972
    }
  },
  {
    code: 'YUL',
    name: 'Montréal-Pierre Elliott Trudeau International Airport',
    location: {
      city: 'Montréal',
      country: 'Canada',
      countryA2: 'CA'
    },
    position: {
      latitude: 45.458241765102336,
      longitude: -74.24973416328436
    }
  },
  {
    code: 'HNL',
    name: 'Daniel K. Inouye International Airport',
    location: {
      city: 'Honolulu',
      country: 'United States of America (the)',
      countryA2: 'US'
    },
    position: {
      latitude: 21.332083982892744,
      longitude: -158.08020210266116
    }
  },
  {
    code: 'SEA',
    name: 'Seattle-Tacoma International Airport',
    location: {
      city: 'Seattle',
      country: 'United States of America (the)',
      countryA2: 'US'
    },
    position: {
      latitude: 47.443595790272894,
      longitude: -123.69764184951785
    }
  },
  {
    code: 'SFO',
    name: 'San Francisco International Airport',
    location: {
      city: 'San Francisco',
      country: 'United States of America (the)',
      countryA2: 'US'
    },
    position: {
      latitude: 37.61701894316063,
      longitude: -123.61662840843204
    }
  },
  {
    code: 'LAX',
    name: 'Los Angeles International Airport',
    location: {
      city: 'Los Angeles',
      country: 'United States of America (the)',
      countryA2: 'US'
    },
    position: {
      latitude: 33.94344005135328,
      longitude: -119.5905570983887
    }
  },
  {
    code: 'JFK',
    name: 'John F. Kennedy International Airport',
    location: {
      city: 'New York',
      country: 'United States of America (the)',
      countryA2: 'US'
    },
    position: {
      latitude: 40.64551266584854,
      longitude: -74.21513366699224
    }
  },
  {
    code: 'SCL',
    name: 'Aeropuerto Internacional Comodoro Arturo Merino Benítez',
    location: {
      city: 'Santiago',
      country: 'Chile',
      countryA2: 'CL'
    },
    position: {
      latitude: -33.39658,
      longitude: -70.79388
    }
  },
  {
    code: 'AEP',
    name: 'Aeroparque Jorge Newbery',
    location: {
      city: 'Buenos Aires',
      country: 'Argentina',
      countryA2: 'AR'
    },
    position: {
      latitude: -34.558889,
      longitude: -58.416389
    }
  }
];

let airportIDs = db.airport.insertMany(airports).insertedIds;
printjson(airportIDs);
