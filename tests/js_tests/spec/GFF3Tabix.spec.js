require([
            'dojo/_base/array',
            'dojo/_base/lang',
            'dojo/request/xhr',
            'JBrowse/Browser',
            'JBrowse/Model/XHRBlob',
            'JBrowse/Store/SeqFeature/GFF3Tabix'
        ], function(
            array,
            lang,
            xhr,
            Browser,
            XHRBlob,
            GFF3TabixStore
        ) {

describe( 'GFF3 tabix store', function() {
   it( 'can parse volvox_tabix.gff3.gz', function() {
           var p = new GFF3TabixStore({
                browser: new Browser({ unitTestMode: true }),
                file: new XHRBlob( '../../sample_data/raw/volvox/volvox.sort.gff3.gz.1' ),
                tbi: new XHRBlob( '../../sample_data/raw/volvox/volvox.sort.gff3.gz.tbi' ),
                refSeq: { name: 'ctgA', start: 0, end: 50001 }
            });

            const [rangeStart,rangeEnd] = [1055,9900]

            var features = [];
            p.getFeatures(
                { ref: 'ctgA', start: rangeStart, end: rangeEnd },
                function(f) { features.push(f); },
                function() { features.done = true },
                function(e) { console.error(e.stack||''+e); }
            );

            waitsFor( function() { return features.done; } );
            runs( function() {
                expect( features.length ).toEqual( 29 );
                //console.log(JSON.stringify(features,undefined,2))

                // check that every top-level feature overlaps the fetched range
                features.forEach(feature => {
                    expect(feature.get('start')).toBeLessThan(rangeEnd)
                    expect(feature.get('end')).toBeGreaterThan(rangeStart)
                })

                let isEden = f => f.get('name') === 'EDEN'
                expect(features.filter(isEden).length).toEqual(1)
                let eden = features.find(isEden)

                expect(JSON.stringify(eden)).toEqual(JSON.stringify(
                    {
                        "data": {
                          "seq_id": "ctgA",
                          "source": "example",
                          "type": "gene",
                          "start": 1049,
                          "end": 9000,
                          "score": null,
                          "strand": 1,
                          "phase": null,
                          "id": "EDEN",
                          "name": "EDEN",
                          "note": "protein kinase",
                          "subfeatures": [
                            {
                              "data": {
                                "seq_id": "ctgA",
                                "source": "example",
                                "type": "mRNA",
                                "start": 1049,
                                "end": 9000,
                                "score": null,
                                "strand": 1,
                                "phase": null,
                                "id": "EDEN.1",
                                "parent": "EDEN",
                                "name": "EDEN.1",
                                "note": "Eden splice form 1",
                                "index": "1",
                                "subfeatures": [
                                  {
                                    "data": {
                                      "seq_id": "ctgA",
                                      "source": "example",
                                      "type": "five_prime_UTR",
                                      "start": 1049,
                                      "end": 1200,
                                      "score": null,
                                      "strand": 1,
                                      "phase": null,
                                      "parent": "EDEN.1"
                                    },
                                    "_uniqueID": "offset-1120",
                                    "_reg_seq_id": "ctga"
                                  },
                                  {
                                    "data": {
                                      "seq_id": "ctgA",
                                      "source": "example",
                                      "type": "CDS",
                                      "start": 1200,
                                      "end": 1500,
                                      "score": null,
                                      "strand": 1,
                                      "phase": "0",
                                      "parent": "EDEN.1"
                                    },
                                    "_uniqueID": "offset-1559",
                                    "_reg_seq_id": "ctga"
                                  },
                                  {
                                    "data": {
                                      "seq_id": "ctgA",
                                      "source": "example",
                                      "type": "CDS",
                                      "start": 2999,
                                      "end": 3902,
                                      "score": null,
                                      "strand": 1,
                                      "phase": "0",
                                      "parent": "EDEN.1"
                                    },
                                    "_uniqueID": "offset-2123",
                                    "_reg_seq_id": "ctga"
                                  },
                                  {
                                    "data": {
                                      "seq_id": "ctgA",
                                      "source": "example",
                                      "type": "CDS",
                                      "start": 4999,
                                      "end": 5500,
                                      "score": null,
                                      "strand": 1,
                                      "phase": "0",
                                      "parent": "EDEN.1"
                                    },
                                    "_uniqueID": "offset-2602",
                                    "_reg_seq_id": "ctga"
                                  },
                                  {
                                    "data": {
                                      "seq_id": "ctgA",
                                      "source": "example",
                                      "type": "CDS",
                                      "start": 6999,
                                      "end": 7608,
                                      "score": null,
                                      "strand": 1,
                                      "phase": "0",
                                      "parent": "EDEN.1"
                                    },
                                    "_uniqueID": "offset-3407",
                                    "_reg_seq_id": "ctga"
                                  },
                                  {
                                    "data": {
                                      "seq_id": "ctgA",
                                      "source": "example",
                                      "type": "three_prime_UTR",
                                      "start": 7608,
                                      "end": 9000,
                                      "score": null,
                                      "strand": 1,
                                      "phase": null,
                                      "parent": "EDEN.1"
                                    },
                                    "_uniqueID": "offset-3733",
                                    "_reg_seq_id": "ctga"
                                  }
                                ]
                              },
                              "_uniqueID": "EDEN.1",
                              "_reg_seq_id": "ctga"
                            },
                            {
                              "data": {
                                "seq_id": "ctgA",
                                "source": "example",
                                "type": "mRNA",
                                "start": 1049,
                                "end": 9000,
                                "score": null,
                                "strand": 1,
                                "phase": null,
                                "id": "EDEN.2",
                                "parent": "EDEN",
                                "name": "EDEN.2",
                                "note": "Eden splice form 2",
                                "index": "1",
                                "subfeatures": [
                                  {
                                    "data": {
                                      "seq_id": "ctgA",
                                      "source": "example",
                                      "type": "five_prime_UTR",
                                      "start": 1049,
                                      "end": 1200,
                                      "score": null,
                                      "strand": 1,
                                      "phase": null,
                                      "parent": "EDEN.2"
                                    },
                                    "_uniqueID": "offset-1178",
                                    "_reg_seq_id": "ctga"
                                  },
                                  {
                                    "data": {
                                      "seq_id": "ctgA",
                                      "source": "example",
                                      "type": "CDS",
                                      "start": 1200,
                                      "end": 1500,
                                      "score": null,
                                      "strand": 1,
                                      "phase": "0",
                                      "parent": "EDEN.2"
                                    },
                                    "_uniqueID": "offset-1606",
                                    "_reg_seq_id": "ctga"
                                  },
                                  {
                                    "data": {
                                      "seq_id": "ctgA",
                                      "source": "example",
                                      "type": "CDS",
                                      "start": 4999,
                                      "end": 5500,
                                      "score": null,
                                      "strand": 1,
                                      "phase": "0",
                                      "parent": "EDEN.2"
                                    },
                                    "_uniqueID": "offset-2649",
                                    "_reg_seq_id": "ctga"
                                  },
                                  {
                                    "data": {
                                      "seq_id": "ctgA",
                                      "source": "example",
                                      "type": "CDS",
                                      "start": 6999,
                                      "end": 7608,
                                      "score": null,
                                      "strand": 1,
                                      "phase": "0",
                                      "parent": "EDEN.2"
                                    },
                                    "_uniqueID": "offset-3454",
                                    "_reg_seq_id": "ctga"
                                  },
                                  {
                                    "data": {
                                      "seq_id": "ctgA",
                                      "source": "example",
                                      "type": "three_prime_UTR",
                                      "start": 7608,
                                      "end": 9000,
                                      "score": null,
                                      "strand": 1,
                                      "phase": null,
                                      "parent": "EDEN.2"
                                    },
                                    "_uniqueID": "offset-3792",
                                    "_reg_seq_id": "ctga"
                                  }
                                ]
                              },
                              "_uniqueID": "EDEN.2",
                              "_reg_seq_id": "ctga"
                            },
                            {
                              "data": {
                                "seq_id": "ctgA",
                                "source": "example",
                                "type": "mRNA",
                                "start": 1299,
                                "end": 9000,
                                "score": null,
                                "strand": 1,
                                "phase": null,
                                "id": "EDEN.3",
                                "parent": "EDEN",
                                "name": "EDEN.3",
                                "note": "Eden splice form 3",
                                "index": "1",
                                "subfeatures": [
                                  {
                                    "data": {
                                      "seq_id": "ctgA",
                                      "source": "example",
                                      "type": "five_prime_UTR",
                                      "start": 1299,
                                      "end": 1500,
                                      "score": null,
                                      "strand": 1,
                                      "phase": null,
                                      "parent": "EDEN.3"
                                    },
                                    "_uniqueID": "offset-1753",
                                    "_reg_seq_id": "ctga"
                                  },
                                  {
                                    "data": {
                                      "seq_id": "ctgA",
                                      "source": "example",
                                      "type": "five_prime_UTR",
                                      "start": 2999,
                                      "end": 3300,
                                      "score": null,
                                      "strand": 1,
                                      "phase": null,
                                      "parent": "EDEN.3"
                                    },
                                    "_uniqueID": "offset-2170",
                                    "_reg_seq_id": "ctga"
                                  },
                                  {
                                    "data": {
                                      "seq_id": "ctgA",
                                      "source": "example",
                                      "type": "CDS",
                                      "start": 3300,
                                      "end": 3902,
                                      "score": null,
                                      "strand": 1,
                                      "phase": "0",
                                      "parent": "EDEN.3"
                                    },
                                    "_uniqueID": "offset-2302",
                                    "_reg_seq_id": "ctga"
                                  },
                                  {
                                    "data": {
                                      "seq_id": "ctgA",
                                      "source": "example",
                                      "type": "CDS",
                                      "start": 4999,
                                      "end": 5500,
                                      "score": null,
                                      "strand": 1,
                                      "phase": "1",
                                      "parent": "EDEN.3"
                                    },
                                    "_uniqueID": "offset-2696",
                                    "_reg_seq_id": "ctga"
                                  },
                                  {
                                    "data": {
                                      "seq_id": "ctgA",
                                      "source": "example",
                                      "type": "CDS",
                                      "start": 6999,
                                      "end": 7600,
                                      "score": null,
                                      "strand": 1,
                                      "phase": "1",
                                      "parent": "EDEN.3"
                                    },
                                    "_uniqueID": "offset-3360",
                                    "_reg_seq_id": "ctga"
                                  },
                                  {
                                    "data": {
                                      "seq_id": "ctgA",
                                      "source": "example",
                                      "type": "three_prime_UTR",
                                      "start": 7600,
                                      "end": 9000,
                                      "score": null,
                                      "strand": 1,
                                      "phase": null,
                                      "parent": "EDEN.3"
                                    },
                                    "_uniqueID": "offset-3674",
                                    "_reg_seq_id": "ctga"
                                  }
                                ]
                              },
                              "_uniqueID": "EDEN.3",
                              "_reg_seq_id": "ctga"
                            }
                          ]
                        },
                        "_uniqueID": "EDEN",
                        "_reg_seq_id": "ctga"
                      }
                ))

                expect( eden.children().length ).toEqual( 3 );
                expect( eden.children()[0].children().length ).toEqual( 6 );
            });
   });
});

});
