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
              amenities: {
                bsonType: 'array',
                items: {
                  bsonType: 'objectId'
                }
              },
              location: {
                bsonType: 'string'
              },
              type: {
                bsonType: 'string'
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

db.createCollection('amenity', {
  validator: {
    $jsonSchema: {
      required: ['icon', 'text'],
      properties: {
        description: {
          bsonType: 'string'
        },
        icon: {
          bsonType: 'string'
        },
        text: {
          bsonType: 'string'
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

let amenities = [
  {
    description: '',
    icon: 'restaurant',
    text: 'Food'
  },
  {
    description: '',
    icon: 'key',
    text: 'Lockers'
  },
  {
    description: '',
    icon: 'power',
    text: 'Power Outlets'
  },
  {
    description: '',
    icon: 'print',
    text: 'Printer'
  },
  {
    description: '',
    icon: 'wc',
    text: 'Restroom'
  },
  {
    description: '',
    icon: 'shower',
    text: 'Shower'
  },
  {
    description: '',
    icon: 'tv',
    text: 'TV'
  },
  {
    description: '',
    icon: 'wifi',
    text: 'Wifi'
  },
  {
    description: '',
    icon: 'desktop_windows',
    text: 'Work Space'
  }
]

let amenityIDs = db.amenity.insertMany(amenities).insertedIds;
printjson(amenityIDs);

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
          airlineIDs[0],
          airlineIDs[2],
          airlineIDs[5],
          airlineIDs[20],
          airlineIDs[23],
          airlineIDs[24],
          airlineIDs[25],
          airlineIDs[26],
          airlineIDs[27],
          airlineIDs[28]
        ],
        access: 'Lufthansa / Star Alliance Business Class or above',
        amenities: [
          amenityIDs[0],
          amenityIDs[1],
          amenityIDs[2],
          amenityIDs[3],
          amenityIDs[4],
          amenityIDs[6],
          amenityIDs[7],
          amenityIDs[8]
        ],
        location: 'Concourse A',
        type: 'Regional',
        description: 'After the security check'
      },
      {
        name: 'Lufthansa Senator Lounge',
        airlines: [
          airlineIDs[20]
        ],
        access: 'Lufthansa Senator or above / Star Alliance Gold',
        amenities: [
          amenityIDs[0],
          amenityIDs[1],
          amenityIDs[2],
          amenityIDs[3],
          amenityIDs[4],
          amenityIDs[6],
          amenityIDs[7],
          amenityIDs[8]
        ],
        location: 'Concourse A',
        type: 'Regional',
        description: 'After the security check'
      },
      {
        name: 'Emirates Lounge',
        airlines: [
          airlineIDs[10]
        ],
        access: 'Emirates Business Class or above',
        amenities: [
          amenityIDs[0],
          amenityIDs[2],
          amenityIDs[4],
          amenityIDs[5],
          amenityIDs[7]
        ],
        location: 'Concourse C',
        type: 'International',
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
      country: 'United Kingdom',
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
      country: 'United Arab Emirates',
      countryA2: 'AE'
    },
    position: {
      latitude: 25.25047950172038,
      longitude: 55.37109375000001
    }
  },
  {
    code: 'AUH',
    name: 'Abu Dhabi International Airport',
    location: {
      city: 'Abu Dhabi',
      country: 'United Arab Emirates',
      countryA2: 'AE'
    },
    position: {
      latitude: 24.433056,
      longitude: 54.651111
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
    code: 'CBR',
    name: 'Canberra Airport',
    location: {
      city: 'Canberra',
      country: 'Australia',
      countryA2: 'AU'
    },
    position: {
      latitude: -35.306944,
      longitude: 149.195
    }
  },
  {
    code: 'MEL',
    name: 'Melbourne Airport',
    location: {
      city: 'Melbourne',
      country: 'Australia',
      countryA2: 'AU'
    },
    position: {
      latitude: -37.673333,
      longitude: 144.843333
    }
  },
  {
    code: 'PER',
    name: 'Perth Airport',
    location: {
      city: 'Perth',
      country: 'Australia',
      countryA2: 'AU'
    },
    position: {
      latitude: -31.9403,
      longitude: 115.9669
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
    code: 'CTS',
    name: 'New Chitose Airport',
    location: {
      city: 'Chitose',
      country: 'Japan',
      countryA2: 'JP'
    },
    position: {
      latitude: 42.775278,
      longitude: 141.6925
    }
  },
  {
    code: 'NRT',
    name: 'Narita International Airport',
    location: {
      city: 'Tokyo (Narita)',
      country: 'Japan',
      countryA2: 'JP'
    },
    position: {
      latitude: 35.765278,
      longitude: 140.385556
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
      latitude: 49.194722,
      longitude: -123.183889
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
      latitude: 51.1225,
      longitude: -114.013333
    }
  },
  {
    code: 'YEG',
    name: 'YEG Edmonton International Airport',
    location: {
      city: 'Edmonton',
      country: 'Canada',
      countryA2: 'CA'
    },
    position: {
      latitude: 53.31,
      longitude: -113.579444
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
      latitude: 43.676667,
      longitude: -79.630556
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
      latitude: 45.470556,
      longitude: -73.740833
    }
  },
  {
    code: 'HNL',
    name: 'Daniel K. Inouye International Airport',
    location: {
      city: 'Honolulu',
      country: 'United States of America',
      countryA2: 'US'
    },
    position: {
      latitude: 21.318611,
      longitude: -157.9225
    }
  },
  {
    code: 'SEA',
    name: 'Seattle-Tacoma International Airport',
    location: {
      city: 'Seattle',
      country: 'United States of America',
      countryA2: 'US'
    },
    position: {
      latitude: 47.448889,
      longitude: -122.309444
    }
  },
  {
    code: 'SFO',
    name: 'San Francisco International Airport',
    location: {
      city: 'San Francisco',
      country: 'United States of America',
      countryA2: 'US'
    },
    position: {
      latitude: 37.618889,
      longitude: -122.375
    }
  },
  {
    code: 'LAX',
    name: 'Los Angeles International Airport',
    location: {
      city: 'Los Angeles',
      country: 'United States of America',
      countryA2: 'US'
    },
    position: {
      latitude: 33.9425,
      longitude: -118.408056
    }
  },
  {
    code: 'JFK',
    name: 'John F. Kennedy International Airport',
    location: {
      city: 'New York',
      country: 'United States of America',
      countryA2: 'US'
    },
    position: {
      latitude: 40.639722,
      longitude: -73.778889
    }
  },
  {
    code: 'MIA',
    name: 'Miami International Airport',
    location: {
      city: 'Miami',
      country: 'United States of America',
      countryA2: 'US'
    },
    position: {
      latitude: 25.793333,
      longitude: -80.290556
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
    code: 'EZE',
    name: 'Ministro Pistarini International Airport',
    location: {
      city: 'Buenos Aires',
      country: 'Argentina',
      countryA2: 'AR'
    },
    position: {
      latitude: -34.82222,
      longitude: -58.53583
    }
  },
  {
    code: 'TLL',
    name: 'Tallinn Airport',
    location: {
      city: 'Tallinn',
      country: 'Estonia',
      countryA2: 'EE'
    },
    position: {
      latitude: 59.41333,
      longitude: 24.8325
    }
  },
  {
    code: 'HEL',
    name: 'Helsinki-Vantaa Airport',
    location: {
      city: 'Helsinki (Vantaa)',
      country: 'Finland',
      countryA2: 'FI'
    },
    position: {
      latitude: 60.31722,
      longitude: 24.96333
    }
  },
  {
    code: 'OSL',
    name: 'Oslo Airport',
    location: {
      city: 'Oslo',
      country: 'Norway',
      countryA2: 'NO'
    },
    position: {
      latitude: 60.202778,
      longitude: 11.083889
    }
  },
  {
    code: 'ARN',
    name: 'Stockholm Arlanda Airport',
    location: {
      city: 'Stockholm',
      country: 'Sweden',
      countryA2: 'SE'
    },
    position: {
      latitude: 59.651944,
      longitude: 17.918611
    }
  },
  {
    code: 'CPH',
    name: 'Copenhagen Airport, Kastrup',
    location: {
      city: 'Copenhagen (Kastrup)',
      country: 'Denmark',
      countryA2: 'DK'
    },
    position: {
      latitude: 55.618056,
      longitude: 12.656111
    }
  },
  {
    code: 'KEF',
    name: 'Keflavik Airport',
    location: {
      city: 'Reykjavik',
      country: 'Iceland',
      countryA2: 'IS'
    },
    position: {
      latitude: 63.985,
      longitude: -22.605556
    }
  },
  {
    code: 'DUB',
    name: 'Dublin Airport',
    location: {
      city: 'Dublin (Collinstown)',
      country: 'Ireland',
      countryA2: 'IE'
    },
    position: {
      latitude: 53.421389,
      longitude: -6.27
    }
  },
  {
    code: 'VIE',
    name: 'Vienna International Airport',
    location: {
      city: 'Vienna',
      country: 'Austria',
      countryA2: 'AT'
    },
    position: {
      latitude: 48.110833,
      longitude: 16.570833
    }
  },
  {
    code: 'ZRH',
    name: 'Zurich Airport',
    location: {
      city: 'Zurich',
      country: 'Switzerland',
      countryA2: 'CH'
    },
    position: {
      latitude: 47.464722,
      longitude: 8.549167
    }
  },
  {
    code: 'ICN',
    name: 'Incheon International Airport',
    location: {
      city: 'Seoul (Incheon)',
      country: 'South Korea (Republic of Korea)',
      countryA2: 'KR'
    },
    position: {
      latitude: 37.463333,
      longitude: 126.44
    }
  },
  {
    code: 'PUS',
    name: 'Gimhae International Airport',
    location: {
      city: 'Busan',
      country: 'South Korea (Republic of Korea)',
      countryA2: 'KR'
    },
    position: {
      latitude: 35.179444,
      longitude: 128.938333
    }
  },
  {
    code: 'FCO',
    name: 'Rome-Fiumicino International Airport "Leonardo da Vinci"',
    location: {
      city: 'Rome (Fiumicino)',
      country: 'Italy',
      countryA2: 'IT'
    },
    position: {
      latitude: 41.800278,
      longitude: 12.238889
    }
  },
  {
    code: 'PRG',
    name: 'Václav Havel Airport Prague',
    location: {
      city: 'Prague',
      country: 'Czech Republic',
      countryA2: 'CZ'
    },
    position: {
      latitude: 50.1018,
      longitude: 14.2632
    }
  },
  {
    code: 'WAW',
    name: 'Warsaw Chopin Airport',
    location: {
      city: 'Warsaw',
      country: 'Poland',
      countryA2: 'PL'
    },
    position: {
      latitude: 52.165833,
      longitude: 20.967222
    }
  },
  {
    code: 'IST',
    name: 'Istanbul Airport',
    location: {
      city: 'Istanbul',
      country: 'Turkey',
      countryA2: 'TR'
    },
    position: {
      latitude: 41.262222,
      longitude: 28.727778
    }
  },
  {
    code: 'TPE',
    name: 'Taoyuan International Airport',
    location: {
      city: 'Taipei (Taoyuan)',
      country: 'Taiwan',
      countryA2: 'TW'
    },
    position: {
      latitude: 25.076389,
      longitude: 121.223889
    }
  },
  {
    code: 'HKG',
    name: 'Hong Kong International Airport',
    location: {
      city: 'Hong Kong',
      country: 'Hong Kong',
      countryA2: 'HK'
    },
    position: {
      latitude: 22.308919,
      longitude: 113.914603
    }
  },
  {
    code: 'GRU',
    name: 'São Paulo/Guarulhos - Govenor André Franco Montoro International Airport',
    location: {
      city: 'São Paulo (Guarulhos)',
      country: 'Brazil',
      countryA2: 'BR'
    },
    position: {
      latitude: -23.435556,
      longitude: -46.473056
    }
  },
  {
    code: 'BSB',
    name: 'Brasília-President Juscelino Kubitschek International Airport',
    location: {
      city: 'Brasília',
      country: 'Brazil',
      countryA2: 'BR'
    },
    position: {
      latitude: -15.869167,
      longitude: -47.920833
    }
  },
  {
    code: 'LIM',
    name: 'Jorge Chávez International Airport',
    location: {
      city: 'Lima (Callao)',
      country: 'Peru',
      countryA2: 'PE'
    },
    position: {
      latitude: -12.021944,
      longitude: -77.114444
    }
  },
  {
    code: 'CPT',
    name: 'Cape Town International Airport Isikhululo Seenqwelomoya',
    location: {
      city: 'Cape Town (Matroosfontein)',
      country: 'South Africa',
      countryA2: 'ZA'
    },
    position: {
      latitude: -33.969444,
      longitude: 18.597222
    }
  }
];

let airportIDs = db.airport.insertMany(airports).insertedIds;
printjson(airportIDs);

let flights = [
  {
    airline: airlineIDs[0],
    number: 844,
    aircraft: 'BOEING 777-300ER',
    cabin: 'BUSINESS',
    departure: {
      airport: airportIDs[25],
      time: {
        time: new Date('2023-04-15T22:50:00+04:00'),
        zone: 'UTC-4',
        utc: new Date('2023-04-15T22:50:00Z')
      }
    },
    duration: 7.333,
    overnight: true,
    arrival: {
      airport: airportIDs[1],
      time: {
        time: new Date('2023-04-16T06:10:00-02:00'),
        zone: 'UTC+2',
        utc: new Date('2023-04-16T06:10:00Z')
      }
    }
  }
]

let flightIDs = db.flight.insertMany(flights).insertedIds;
printjson(flightIDs);
