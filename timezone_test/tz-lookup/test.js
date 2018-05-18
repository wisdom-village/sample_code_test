describe("tzlookup", function() {
  "use strict";
  var tz;
  if(typeof tzlookup !== "undefined") {
    tz = tzlookup;
  }
  else {
    tz = require("./");
  }

  function stringify_item(x) {
    return "" + x;
  }

  function stringify_list(x) {
    return x.map(stringify_item).join(", ");
  }

  function pass(testcase) {
    var args = testcase[0];
    var expected = testcase[1];

    it(
      "should return \"" + expected + "\" given " + stringify_list(args),
      function() {
        var actual = tz.apply(null, args);

        if(actual !== expected) {
          throw new Error(
            "expected \"" + actual + "\" to equal \"" + expected + "\""
          );
        }
      }
    );
  }

  function fail(args) {
    it("should fail given " + stringify_list(args), function() {
      try {
        tz.apply(null, args);
      }
      catch(err) {
        if(err.message === "invalid coordinates") {
          return;
        }
        throw err;
      }

      throw new Error("expected an exception to occur, but none did");
    });
  }

  [
    /* These tests are hand-crafted for specific locations. */
    [[ 40.7092,  -74.0151], "America/New_York"],
    [[ 42.3668,  -71.0546], "America/New_York"],
    [[ 41.8976,  -87.6205], "America/Chicago"],
    [[ 47.6897, -122.4023], "America/Los_Angeles"],
    [[ 42.7235,  -73.6931], "America/New_York"],
    [[ 42.5807,  -83.0223], "America/Detroit"],
    [[ 36.8381,  -84.8500], "America/Kentucky/Monticello"],
    [[ 40.1674,  -85.3583], "America/Indiana/Indianapolis"],
    [[ 37.9643,  -86.7453], "America/Indiana/Tell_City"],
    [[ 38.6043,  -90.2417], "America/Chicago"],
    [[ 41.1591, -104.8261], "America/Denver"],
    [[ 35.1991, -111.6348], "America/Phoenix"],
    [[ 43.1432, -115.6750], "America/Boise"],
    [[ 47.5886, -122.3382], "America/Los_Angeles"],
    [[ 58.3168, -134.4397], "America/Juneau"],
    [[ 21.4381, -158.0493], "Pacific/Honolulu"],
    [[ 42.7000,  -80.0000], "America/Toronto"],
    [[ 51.0036, -114.0161], "America/Edmonton"],
    [[-16.4965,  -68.1702], "America/La_Paz"],
    [[-31.9369,  115.8453], "Australia/Perth"],
    [[ 42.0000,  -87.5000], "America/Chicago"],
    [[ 36.9147, -111.4558], "America/Phoenix"], // #7
    [[ 46.1328,  -64.7714], "America/Moncton"],
    [[ 44.9280,  -87.1853], "America/Chicago"], // #13
    [[ 50.7029,  -57.3511], "America/St_Johns"], // #13
    [[ 29.9414,  -85.4064], "America/Chicago"], // #14
    [[ 49.7261,   -1.9104], "Europe/Paris"], // #15
    [[ 65.5280,   23.5570], "Europe/Stockholm"], // #16
    [[ 35.8722,  -84.5250], "America/New_York"], // #18

    /* Sanity-check international waters. */
    [[-65, -180], "Etc/GMT+12"],
    [[-65, -165], "Etc/GMT+11"],
    [[-65, -150], "Etc/GMT+10"],
    [[-65, -135], "Etc/GMT+9"],
    [[-65, -120], "Etc/GMT+8"],
    [[-65, -105], "Etc/GMT+7"],
    [[-65,  -90], "Etc/GMT+6"],
    [[-65,  -75], "Etc/GMT+5"],
    [[-65,  -60], "Etc/GMT+4"],
    [[-65,  -45], "Etc/GMT+3"],
    [[-65,  -30], "Etc/GMT+2"],
    [[-65,  -15], "Etc/GMT+1"],
    [[-65,    0], "Etc/GMT"],
    [[-65,   15], "Etc/GMT-1"],
    [[-65,   30], "Etc/GMT-2"],
    [[-65,   45], "Etc/GMT-3"],
    [[-65,   60], "Etc/GMT-4"],
    [[-65,   75], "Etc/GMT-5"],
    [[-65,   90], "Etc/GMT-6"],
    [[-65,  105], "Etc/GMT-7"],
    [[-65,  120], "Etc/GMT-8"],
    [[-65,  135], "Etc/GMT-9"],
    [[-65,  150], "Etc/GMT-10"],
    [[-65,  165], "Etc/GMT-11"],
    [[-65,  180], "Etc/GMT-12"],

    /* Strings should be allowed. */
    [["42.3668",  "-71.0546"], "America/New_York"],
    [["21.4381", "-158.0493"], "Pacific/Honolulu"],

    /* These are automatically-generated test-cases just so I can be
     * confident when I change the data storage format all around. */
    [[ 37.8358,  -89.0556], "America/Chicago"],
    [[-29.3372,  -56.9745], "America/Argentina/Cordoba"],
    [[ 82.3141,  -39.1331], "America/Godthab"],
    [[ 54.1241,   95.1606], "Asia/Krasnoyarsk"],
    [[ -3.6445,   24.5964], "Africa/Lubumbashi"],
    [[ 21.9200,   76.3888], "Asia/Kolkata"],
    [[ 81.0433,  -78.2488], "America/Iqaluit"],
    [[ 41.4793,   -2.7493], "Europe/Madrid"],
    [[ 16.5041,  103.0204], "Asia/Bangkok"],
    [[ 72.4750, -122.6775], "America/Yellowknife"],
    [[ 64.9576,  144.3597], "Asia/Srednekolymsk"],
    [[ 20.2716,   28.7996], "Africa/Khartoum"],
    [[-18.6123,  137.4460], "Australia/Darwin"],
    [[ 57.0724,  104.8747], "Asia/Irkutsk"],
    [[ 30.4075,  113.4049], "Asia/Shanghai"],
    [[ 67.9909,  164.1215], "Asia/Anadyr"],
    [[ 30.7623,  -84.0980], "America/New_York"],
    [[  1.9845,  100.4508], "Asia/Jakarta"],
    [[ 69.3563,  -39.2451], "America/Godthab"],
    [[ 16.1784,  106.2894], "Asia/Vientiane"],
    [[ 22.1635,  -84.3358], "America/Havana"],
    [[ 65.9140,  -70.5960], "America/Iqaluit"],
    [[ 69.8885, -107.6005], "America/Cambridge_Bay"],
    [[ 39.2287,   32.3653], "Europe/Istanbul"],
    [[ 65.9913,   43.2401], "Europe/Moscow"],
    [[-31.3366,  -57.4872], "America/Montevideo"],
    [[ 67.7696,  158.2245], "Asia/Srednekolymsk"],
    [[ -9.6156,   34.1749], "Africa/Blantyre"],
    [[ 65.8424,  -52.6658], "America/Godthab"],
    [[ 38.8582,  -78.9750], "America/New_York"],
    [[-27.8742,  146.6473], "Australia/Brisbane"],
    [[ 45.9379,   62.7043], "Asia/Qyzylorda"],
    [[ 64.3534,   73.2775], "Asia/Yekaterinburg"],
    [[ 29.9944,  -99.8165], "America/Chicago"],
    [[ 29.1503,   23.8957], "Africa/Tripoli"],
    [[ 54.5334,   92.8278], "Asia/Krasnoyarsk"],
    [[ 64.9790,  -41.9666], "America/Godthab"],
    [[-17.2287,   33.9961], "Africa/Maputo"],
    [[ 68.3552, -149.0941], "America/Anchorage"],
    [[ 40.8713,   86.7712], "Asia/Urumqi"],
    [[ 58.9104, -108.2242], "America/Regina"],
    [[ 63.9166,   56.0705], "Europe/Moscow"],
    [[ 54.7639,   41.9429], "Europe/Moscow"],
    [[ 81.8413,  -73.2339], "America/Iqaluit"],
    [[ -2.1921,   10.6367], "Africa/Libreville"],
    [[  9.5718,  -83.1948], "America/Costa_Rica"],
    [[ 11.9618,  -71.7086], "America/Bogota"],
    [[ 65.5352,   74.4143], "Asia/Yekaterinburg"],
    [[ 50.5575,  -93.9996], "America/Winnipeg"],
    [[ 51.6740,  157.0986], "Asia/Kamchatka"],
    [[ 46.7376,  142.8907], "Asia/Sakhalin"],
    [[ 37.5756,  120.5804], "Asia/Shanghai"],
    [[ 32.7113,   74.3851], "Asia/Karachi"],
    [[-24.4658,  -55.8260], "America/Asuncion"],
    [[ 24.1446,  113.9533], "Asia/Shanghai"],
    [[ 46.8222, -114.0462], "America/Denver"],
    [[ 60.6475,   66.0918], "Asia/Yekaterinburg"],
    [[ 64.5038,  -75.8160], "America/Iqaluit"],
    [[ 61.4801,   57.7244], "Asia/Yekaterinburg"],
    [[ 62.5267,   96.4454], "Asia/Krasnoyarsk"],
    [[-25.1877,  139.8115], "Australia/Brisbane"],
    [[ 13.6274,   99.6599], "Asia/Bangkok"],
    [[ -9.6665,  -43.4782], "America/Bahia"],
    [[ 17.5016,   -8.0710], "Africa/Nouakchott"],
    [[ 64.1965, -116.9276], "America/Yellowknife"],
    [[ 74.0116,  -35.9084], "America/Godthab"],
    [[ 28.1819,   47.1326], "Asia/Riyadh"],
    [[-25.8522,  139.7641], "Australia/Brisbane"],
    [[ 55.1606,   80.3125], "Asia/Novosibirsk"],
    [[ 58.5365,  -99.8847], "America/Winnipeg"],
    [[ 19.0721,   -0.7923], "Africa/Bamako"],
    [[ 51.7151,   84.7338], "Asia/Barnaul"],
    [[ 23.2615,   76.4792], "Asia/Kolkata"],
    [[ 46.7260,   79.0294], "Asia/Almaty"],
    [[ 54.2007, -121.4509], "America/Vancouver"],
    [[ 57.9166,   96.0225], "Asia/Krasnoyarsk"],
    [[ 19.8781,    9.8020], "Africa/Niamey"],
    [[ 65.0340, -155.4731], "America/Anchorage"],
    [[ 21.2294,  102.3456], "Asia/Vientiane"],
    [[ 14.6321,   74.8661], "Asia/Kolkata"],
    [[ 73.9279,   56.0125], "Europe/Moscow"],
    [[ 61.0509,   79.4277], "Asia/Yekaterinburg"],
    [[ -5.8263,  -38.5891], "America/Fortaleza"],
    [[ 66.1051,  -44.2991], "America/Godthab"],
    [[ 61.9720, -122.8406], "America/Yellowknife"],
    [[ 50.7092,   98.1654], "Asia/Ulaanbaatar"],
    [[ 42.7892,  -80.2958], "America/Toronto"],
    [[ 20.1117,   53.8416], "Asia/Riyadh"],
    [[ 66.7761,  148.5291], "Asia/Srednekolymsk"],
    [[ -5.3391,   16.3601], "Africa/Kinshasa"],
    [[ 27.3337,   40.2867], "Asia/Riyadh"],
    [[ 19.2194,   19.0398], "Africa/Ndjamena"],
    [[  5.0789,   34.1745], "Africa/Juba"],
    [[ -0.9584,  -49.4351], "America/Belem"],
    [[ 57.1181,   69.5137], "Asia/Yekaterinburg"],
    [[  9.0181,   27.4099], "Africa/Juba"],
    [[ 11.9072,   13.9995], "Africa/Lagos"],
    [[ 30.0807,  -93.3324], "America/Chicago"],
    [[-23.3847,  -56.5457], "America/Asuncion"],
    [[ 39.8811,   26.3869], "Europe/Istanbul"],
    [[ 69.0819,   49.1753], "Europe/Moscow"],
    [[ 29.1968,   58.7977], "Asia/Tehran"],
    [[ 26.3241,  -11.1860], "Africa/El_Aaiun"],
    [[ 74.5094,  -46.1125], "America/Godthab"],
    [[-18.0039,  137.1668], "Australia/Darwin"],
    [[  3.1497,  -63.0510], "America/Boa_Vista"],
    [[ 48.6762,   79.7838], "Asia/Almaty"],
    [[ 59.6321,   35.7763], "Europe/Moscow"],
    [[ 31.9457,  -89.0334], "America/Chicago"],
    [[ 45.4515,  -66.2694], "America/Moncton"],
    [[ 45.3159,   74.4388], "Asia/Almaty"],
    [[ 22.9471,   71.5664], "Asia/Kolkata"],
    [[ 39.4891,   29.9276], "Europe/Istanbul"],
    [[ 69.5459,  -40.9566], "America/Godthab"],
    [[-25.1121,  -56.3599], "America/Asuncion"],
    [[ 58.6718,   71.7465], "Asia/Yekaterinburg"],
    [[ 38.7813, -105.5734], "America/Denver"],
    [[ 53.4450,   25.5964], "Europe/Minsk"],
    [[ 64.6617,  160.8968], "Asia/Magadan"],
    [[ 61.6405,   69.4836], "Asia/Yekaterinburg"],
    [[-12.9104,   36.1809], "Africa/Maputo"],
    [[ 52.5127,  -65.5284], "America/Goose_Bay"],
    [[ -2.1186,   11.7021], "Africa/Libreville"],
    [[ 41.9794,  -93.6538], "America/Chicago"],
    [[ 59.3750,   40.2467], "Europe/Moscow"],
    [[ -6.1405,   27.0324], "Africa/Lubumbashi"],
    [[ 28.0069,   27.9217], "Africa/Cairo"],
    [[ 17.5589,   82.9606], "Asia/Kolkata"],
    [[ 77.0070,  -58.1725], "America/Godthab"],
    [[ 25.1439,   50.4092], "Asia/Riyadh"],
    [[ 13.5243,   26.5038], "Africa/Khartoum"],
    [[-19.5728,  134.1770], "Australia/Darwin"],
    [[ 37.7332, -116.5272], "America/Los_Angeles"],
    [[-30.6651,  120.3113], "Australia/Perth"],
    [[ 74.6277,  -33.1710], "America/Godthab"],
    [[ 53.6035,  -97.5722], "America/Winnipeg"],
    [[ 55.5158,   58.6481], "Asia/Yekaterinburg"],
    [[-10.3277,   38.6084], "Africa/Dar_es_Salaam"],
    [[ 34.7560,   44.4394], "Asia/Baghdad"],
    [[ 62.6169,  103.2882], "Asia/Krasnoyarsk"],
    [[ -2.6981,  -73.2412], "America/Lima"],
    [[ -4.9274,  -65.3226], "America/Manaus"],
    [[ 71.1648, -117.7618], "America/Yellowknife"],
    [[ 58.5594,   34.6095], "Europe/Moscow"],
    [[ 55.2956,   32.0908], "Europe/Moscow"],
    [[-15.3693,   36.5350], "Africa/Maputo"],
    [[-19.4016,   47.3511], "Indian/Antananarivo"],
    [[ 23.3162,   12.8176], "Africa/Niamey"],
    [[ 41.4247,  121.1758], "Asia/Shanghai"],
    [[ 49.0067,   17.4505], "Europe/Prague"],
    [[-22.7467,  130.6468], "Australia/Darwin"],
    [[ 63.8349,  152.5360], "Asia/Magadan"],
    [[-20.7583,  120.7570], "Australia/Perth"],
    [[ 62.7709, -118.4994], "America/Yellowknife"],
    [[ 21.2630,   17.5662], "Africa/Ndjamena"],
    [[ 63.7417, -115.2235], "America/Yellowknife"],
    [[ 81.6018,  -59.8101], "America/Godthab"],
    [[-38.1635,  -57.7626], "America/Argentina/Buenos_Aires"],
    [[ 36.1970, -107.8392], "America/Denver"],
    [[ 26.0985, -105.9614], "America/Monterrey"],
    [[ 32.3567,  113.1371], "Asia/Shanghai"],
    [[ 27.4785,   48.7596], "Asia/Riyadh"],
    [[ 41.5358,   69.8340], "Asia/Tashkent"],
    [[-31.7125,  -60.6771], "America/Argentina/Cordoba"],
    [[ 55.3174, -111.7919], "America/Edmonton"],
    [[ 23.4918,   -4.6733], "Africa/Bamako"],
    [[ 23.4670,   42.9883], "Asia/Riyadh"],
    [[ 64.0877,   20.1457], "Europe/Stockholm"],
    [[ 73.5927, -115.9105], "America/Yellowknife"],
    [[ 51.8279,  -84.3882], "America/Toronto"],
    [[ 56.5034, -108.7968], "America/Regina"],
    [[ 55.2477,   64.4429], "Asia/Yekaterinburg"],
    [[ 79.9054,  -80.5558], "America/Iqaluit"],
    [[ 68.1178,  137.7878], "Asia/Vladivostok"],
    [[ 75.4235,  140.6829], "Asia/Vladivostok"],
    [[ 25.1553,   30.5491], "Africa/Cairo"],
    [[ 57.5382,   69.7678], "Asia/Yekaterinburg"],
    [[ 19.2966,   13.2915], "Africa/Niamey"],
    [[-29.3300,  -51.9941], "America/Sao_Paulo"],
    [[ 68.4663,  137.8967], "Asia/Vladivostok"],
    [[ 65.0498,   43.3195], "Europe/Moscow"],
    [[ 56.5933,   91.5732], "Asia/Krasnoyarsk"],
    [[ 63.4242,  153.9570], "Asia/Magadan"],
    [[ 60.5414,  102.2830], "Asia/Krasnoyarsk"],
    [[ 78.2319,  -35.9009], "America/Godthab"],
    [[ 50.4043,   20.1115], "Europe/Warsaw"],
    [[ 67.7007, -139.1173], "America/Whitehorse"],
    [[ 46.7656,   96.6875], "Asia/Hovd"],
    [[-22.5825,   29.4276], "Africa/Johannesburg"],
    [[ 59.9827,   92.8622], "Asia/Krasnoyarsk"],
    [[ 32.2351,   74.7128], "Asia/Karachi"],
    [[ 81.5336,  -86.4839], "America/Rankin_Inlet"],
    [[ 77.1564,  -25.3151], "America/Godthab"],
    [[ 40.7495,   34.3622], "Europe/Istanbul"],
    [[-12.6167,  -54.5727], "America/Cuiaba"],
    [[ 26.5547, -100.3505], "America/Monterrey"],
    [[ 43.4997,  118.0167], "Asia/Shanghai"],
    [[ 48.2616,   20.3343], "Europe/Budapest"],
    [[ 44.7708,   44.7429], "Europe/Moscow"],
    [[ 48.3448,  108.2238], "Asia/Ulaanbaatar"],
    [[ 54.1347, -123.4773], "America/Vancouver"],
    [[ 37.1042,   -8.4274], "Europe/Lisbon"],
    [[ 79.8894,   17.3457], "Arctic/Longyearbyen"],
    [[ 63.2507,  -46.7969], "America/Godthab"],
    [[ -1.9246,   29.0612], "Africa/Lubumbashi"],
    [[-12.3557,  -53.4448], "America/Cuiaba"],
    [[-27.3542,  -49.1180], "America/Sao_Paulo"],
    [[ 62.9927,   24.7490], "Europe/Helsinki"],
    [[ 76.0195,  -49.4057], "America/Godthab"],
    [[ 14.1445,    3.7444], "Africa/Niamey"],
    [[ 14.4858,   19.3595], "Africa/Ndjamena"],
    [[  8.5186,   11.5768], "Africa/Lagos"],
    [[ 16.1586,   51.0247], "Asia/Aden"],
    [[ 56.5211,   46.9765], "Europe/Moscow"],
    [[ -0.8225,  122.7093], "Asia/Makassar"],
    [[ 71.7943,  142.9243], "Asia/Vladivostok"],
    [[ 53.4800,  102.6862], "Asia/Irkutsk"],
    [[ 54.4724,   35.8859], "Europe/Moscow"],
    [[ 42.6423,   47.3439], "Europe/Moscow"],
    [[ 21.3766,   -9.0809], "Africa/Nouakchott"],
    [[ 15.3113,   32.8385], "Africa/Khartoum"],
    [[ -0.9303,  -61.5420], "America/Manaus"],
    [[ 61.4208,  165.6336], "Asia/Kamchatka"],
    [[ 31.5990,  110.1621], "Asia/Shanghai"],
    [[-25.9807,   26.9300], "Africa/Johannesburg"],
    [[ 61.7306,  -48.6246], "America/Godthab"],
    [[ 64.2152,  124.0541], "Asia/Yakutsk"],
    [[-46.1385,  -72.9657], "America/Santiago"],
    [[ 15.8589,   24.5199], "Africa/Khartoum"],
    [[ 56.0054,   60.8903], "Asia/Yekaterinburg"],
    [[ 61.4232, -131.4265], "America/Whitehorse"],
    [[ 60.1848, -122.0054], "America/Yellowknife"],
    [[ 51.5442, -105.1728], "America/Regina"],
    [[ 43.8244,  -96.6180], "America/Chicago"],
    [[ 62.6568,   77.4446], "Asia/Yekaterinburg"],
    [[ 72.0346,  -32.6102], "America/Godthab"],
    [[ 14.0688,  -13.6619], "Africa/Dakar"],
    [[ 79.5181,  -25.8663], "America/Godthab"],
    [[ 59.8240,   37.2919], "Europe/Moscow"],
    [[  9.1754,  -76.0658], "America/Bogota"],
    [[ -3.3148,   38.7519], "Africa/Nairobi"],
    [[-30.8390,  -61.0529], "America/Argentina/Cordoba"],
    [[ 77.3716,  -56.5280], "America/Godthab"],
    [[ 25.4612,   16.3495], "Africa/Tripoli"],
    [[ 49.2977, -125.2356], "America/Vancouver"],
    [[ 18.4695,   27.3104], "Africa/Khartoum"],
    [[ 65.4723,  167.7756], "Asia/Anadyr"],
    [[ 53.0989,   40.2981], "Europe/Moscow"],
    [[ 46.0498, -119.7057], "America/Los_Angeles"],
    [[ 33.4187,   40.2683], "Asia/Baghdad"],
    [[ 46.6549,   33.7897], "Europe/Kiev"],
    [[ 67.5675,  115.0571], "Asia/Yakutsk"],
    [[ 54.2140,   45.7523], "Europe/Moscow"],
    [[-15.4168,   27.5488], "Africa/Lusaka"],
    [[ 72.0585,   94.0572], "Asia/Krasnoyarsk"],
    [[ 43.7057,  -79.6802], "America/Toronto"],
    [[ 68.7574,   27.1326], "Europe/Helsinki"],
    [[ 47.9892,  138.5052], "Asia/Vladivostok"],
    [[ 49.5039,  106.2301], "Asia/Ulaanbaatar"],
    [[ 47.1250,   86.2943], "Asia/Urumqi"],
    [[-30.7504,  -65.1035], "America/Argentina/Cordoba"],
    [[ 73.0064,   98.4606], "Asia/Krasnoyarsk"],
    [[ 72.9200,  -53.8420], "America/Godthab"],
    [[ 33.9540,  -84.6719], "America/New_York"],
    [[ 70.2102,  109.2729], "Asia/Krasnoyarsk"],
    [[ 14.5076,   76.2365], "Asia/Kolkata"],
    [[ 29.1668,   28.7916], "Africa/Cairo"],
    [[ -6.3410,   16.0039], "Africa/Luanda"],
    [[ 15.7965,   18.3872], "Africa/Ndjamena"],
    [[ -7.7214,  140.5180], "Asia/Jayapura"],
    [[ 23.8358,   14.1805], "Africa/Tripoli"],
    [[ 56.1999,  114.3054], "Asia/Irkutsk"],
    [[ 40.6756,   -3.1529], "Europe/Madrid"],
    [[ 46.6208, -110.5776], "America/Denver"],
    [[ 33.8164,   -4.3187], "Africa/Casablanca"],
    [[ 19.4155,  -70.3931], "America/Santo_Domingo"],
    [[ 63.9662,   27.2907], "Europe/Helsinki"],
    [[ 30.4291,   -7.3296], "Africa/Casablanca"],
    [[-12.6378,  -57.5000], "America/Cuiaba"],
    [[ -3.9646,  -73.4212], "America/Lima"],
    [[-18.8768,  123.5026], "Australia/Perth"],
    [[ -3.2149,  -60.7691], "America/Manaus"],
    [[ 56.0306,   96.2819], "Asia/Krasnoyarsk"],
    [[ 61.3456, -154.6022], "America/Anchorage"],
    [[ 17.0363,   80.1072], "Asia/Kolkata"],
    [[ 32.9800,  -84.4394], "America/New_York"],
    [[ 69.7465,   88.1611], "Asia/Krasnoyarsk"],
    [[-24.7776,  133.3335], "Australia/Darwin"],
    [[ 52.2638,   23.4595], "Europe/Minsk"],
    [[  6.0803,   33.7236], "Africa/Juba"],
    [[ 46.2339,  118.3615], "Asia/Shanghai"],
    [[-31.8517,   19.9454], "Africa/Johannesburg"],
    [[ 28.4657,  110.0877], "Asia/Shanghai"],
    [[ 40.1297,   63.6307], "Asia/Samarkand"],
    [[-19.1731,   14.5112], "Africa/Windhoek"],
    [[ 56.6561,   54.9217], "Asia/Yekaterinburg"],
    [[ 48.5194,   62.6996], "Asia/Aqtobe"],
    [[ 15.0813,  102.2842], "Asia/Bangkok"],
    [[ -2.9155,  104.5851], "Asia/Jakarta"],
    [[ 20.8734,   13.1134], "Africa/Niamey"],
    [[ 30.7539,    4.9642], "Africa/Algiers"],
    [[ 51.2865,  121.6765], "Asia/Shanghai"],
    [[ 18.4527,    3.0800], "Africa/Bamako"],
    [[-12.9176,  -51.8294], "America/Cuiaba"],
    [[ -9.8941,   31.4986], "Africa/Lusaka"],
    [[ 51.1884,   72.5447], "Asia/Almaty"],
    [[ 50.1720,  109.3305], "Asia/Chita"],
    [[ 31.6023,  -81.5271], "America/New_York"],
    [[-34.9033,  -64.2808], "America/Argentina/Cordoba"],
    [[ 11.9140,   -1.7697], "Africa/Ouagadougou"],
    [[ 25.2369,  115.3962], "Asia/Shanghai"],
    [[ 68.4210,  152.2690], "Asia/Srednekolymsk"],
    [[ 46.9954,  102.2327], "Asia/Ulaanbaatar"],
    [[  7.5015,   41.0239], "Africa/Addis_Ababa"],
    [[ 49.8186,   90.2840], "Asia/Hovd"],
    [[ 56.5580, -104.9026], "America/Regina"],
    [[  1.3163,  -70.7942], "America/Bogota"],
    [[-15.0202,  127.2482], "Australia/Perth"],
    [[ 20.7633,    3.2933], "Africa/Algiers"],
    [[ 58.7958,   56.7150], "Asia/Yekaterinburg"],
    [[ 57.3421,  -98.0511], "America/Winnipeg"],
    [[  3.6109,  -73.4326], "America/Bogota"],
    [[  6.3923,   -6.7531], "Africa/Abidjan"],
    [[ 31.3301,   60.7153], "Asia/Tehran"],
    [[ 50.3759,    7.5712], "Europe/Berlin"],
    [[  1.7587,   34.0083], "Africa/Kampala"],
    [[-26.7159,  149.7563], "Australia/Brisbane"],
    [[ 44.2626,   44.7455], "Europe/Moscow"],
    [[ 59.8934, -129.0060], "America/Vancouver"],
    [[ -0.6722,  -77.7137], "America/Guayaquil"],
    [[ 45.3270, -111.0269], "America/Denver"],
    [[-21.4916,   18.2277], "Africa/Windhoek"],
    [[ 69.8075,  -36.7877], "America/Godthab"],
    [[ 62.4056,   40.1308], "Europe/Moscow"],
    [[ 35.6780,  -85.8903], "America/Chicago"],
    [[ -5.2175,  -55.5735], "America/Santarem"],
    [[ 19.3533,   73.4849], "Asia/Kolkata"],
    [[ 69.7972,  -50.0355], "America/Godthab"],
    [[ 14.7315,   20.6226], "Africa/Ndjamena"],
    [[-11.9026,   19.1156], "Africa/Luanda"],
    [[-19.0649,  -52.4491], "America/Campo_Grande"],
    [[ 61.3513, -148.3128], "America/Anchorage"],
    [[ 73.8546, -120.2774], "America/Yellowknife"],
    [[ 69.4978,  156.2309], "Asia/Srednekolymsk"],
    [[ 23.2705,   87.0558], "Asia/Kolkata"],
    [[ 15.9273,  -92.0672], "America/Mexico_City"],
    [[ 67.4221,  -51.8146], "America/Godthab"],
    [[-20.2422,  -40.7203], "America/Sao_Paulo"],
    [[ 59.0311, -126.9869], "America/Vancouver"],
    [[ 14.8675,   76.3773], "Asia/Kolkata"],
    [[-26.1632,   16.0042], "Africa/Windhoek"],
    [[ 65.1068,  -87.7971], "America/Rankin_Inlet"],
    [[ -1.2604,   17.7737], "Africa/Kinshasa"],
    [[ 26.2379,   12.8011], "Africa/Tripoli"],
    [[ 33.2165,  114.4249], "Asia/Shanghai"],
    [[  3.7725,   21.4347], "Africa/Kinshasa"],
    [[  1.5147,  116.9022], "Asia/Makassar"],
    [[ 21.2209,   54.6444], "Asia/Riyadh"],
    [[-18.5604,   13.7071], "Africa/Windhoek"],
    [[ 73.3086,  -50.3401], "America/Godthab"],
    [[ 66.0904,  141.2401], "Asia/Srednekolymsk"],
    [[ 57.5957,   83.7790], "Asia/Tomsk"],
    [[ 62.4294, -160.5397], "America/Anchorage"],
    [[  5.2829,   35.5583], "Africa/Juba"],
    [[ 38.9473,   90.3155], "Asia/Urumqi"],
    [[ 49.7176, -120.6521], "America/Vancouver"],
    [[ 25.6025,  -99.0005], "America/Monterrey"],
    [[ 67.5031,  -38.0278], "America/Godthab"],
    [[ 42.6345,   95.3104], "Asia/Urumqi"],
    [[ 43.4929,   78.0778], "Asia/Almaty"],
    [[ 58.7754, -120.0701], "America/Fort_Nelson"],
    [[  0.1582,  -77.8423], "America/Guayaquil"],
    [[ 60.8634, -131.1674], "America/Whitehorse"],
    [[ -2.3241,  -65.9156], "America/Manaus"],
    [[ 51.2849,   31.5151], "Europe/Kiev"],
    [[ -0.6626,   17.8965], "Africa/Kinshasa"],
    [[ 73.2245,  -96.8935], "America/Rankin_Inlet"],
    [[ 32.3177,   46.9431], "Asia/Baghdad"],
    [[ 43.5323,   65.9852], "Asia/Qyzylorda"],
    [[ 21.9848,  -79.4824], "America/Havana"],
    [[  3.1742,   29.6364], "Africa/Lubumbashi"],
    [[ 45.4705,  135.6598], "Asia/Vladivostok"],
    [[ 52.9221,  101.7918], "Asia/Irkutsk"],
    [[ 18.1641,   18.4528], "Africa/Ndjamena"],
    [[  8.6146,  -65.2355], "America/Caracas"],
    [[ -6.6831,   22.1025], "Africa/Lubumbashi"],
    [[ 64.1049,   89.7467], "Asia/Krasnoyarsk"],
    [[-28.1880,  119.3906], "Australia/Perth"],
    [[-23.5594,  142.2289], "Australia/Brisbane"],
    [[ 22.4934,  -12.2664], "Africa/Nouakchott"],
    [[ 17.1192,  -12.8761], "Africa/Nouakchott"],
    [[ 51.4541,   43.3003], "Europe/Saratov"],
    [[ 15.1609,   76.2168], "Asia/Kolkata"],
    [[ 60.0202,   89.4423], "Asia/Krasnoyarsk"],
    [[ 41.8693,   -5.9326], "Europe/Madrid"],
    [[  4.2187,  -62.7399], "America/Caracas"],
    [[ 69.5304,   85.2865], "Asia/Krasnoyarsk"],
    [[ 36.6934,  113.5059], "Asia/Shanghai"],
    [[ 17.4480,   49.6467], "Asia/Aden"],
    [[ 71.4531,  -46.1878], "America/Godthab"],
    [[ 14.5328,   20.0108], "Africa/Ndjamena"],
    [[ 49.0779,  105.2610], "Asia/Ulaanbaatar"],
    [[-10.7260,  -66.9046], "America/La_Paz"],
    [[ 31.2644,   21.7824], "Africa/Tripoli"],
    [[ 57.2329,   94.6034], "Asia/Krasnoyarsk"],
    [[ 12.6608,  -87.2430], "America/Managua"],
    [[ 63.4155, -109.7556], "America/Yellowknife"],
    [[ 41.8814, -113.9326], "America/Denver"],
    [[  8.1392,   80.1801], "Asia/Colombo"],
    [[ 53.9195,  107.1539], "Asia/Irkutsk"],
    [[ 29.5765,   28.8024], "Africa/Cairo"],
    [[ 75.7569,  -40.2910], "America/Godthab"],
    [[ 54.6688, -115.0705], "America/Edmonton"],
    [[ -8.8954,  -38.3336], "America/Recife"],
    [[ 67.2404,   94.0746], "Asia/Krasnoyarsk"],
    [[ 73.9764,   56.1288], "Europe/Moscow"],
    [[ 58.4602,   25.1753], "Europe/Tallinn"],
    [[ 28.7239,   27.2395], "Africa/Cairo"],
    [[ 75.2983,   99.6727], "Asia/Krasnoyarsk"],
  ].forEach(pass);

  /* Sanity-check that bad inputs fail. */
  [
    [100, 10],
    [10, 190],
    ["hello", 10],
    [10, "hello"],
    [undefined, undefined],
    [{lat: 10, lon: 10}],
  ].forEach(fail);
});
