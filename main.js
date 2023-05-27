const userData = JSON.parse(localStorage.getItem("user_data"));
if (!userData) {
  const userId = [
    {
      email: "sesslyn@gmail.com",
      image: "https://iili.io/HNUCkOP.png",
      name: "Sesslyn",
      password: "Sess#123",
      phone: "789054321",
      location: "Tirutani",
    },
    {
      email: "uthra@gmail.com",
      image: "https://iili.io/HNUCSzF.jpg",
      name: "Uthra",
      password: "Uthr#123",
      phone: "7904911208",
      location: "Pondicherry",
    },
    {
      email: "meena@gmail.com",
      image: "https://iili.io/HNUCZbt.jpg",
      name: "Meena",
      password: "Meen#123",
      phone: "7416687991",
      location: "Trichy",
    },
    {
      email: "karkuvel@gmail.com",
      image: "https://iili.io/HNUBEMJ.jpg",
      name: "Karkuvel",
      password: "Kark#123",
      phone: "9870000890",
      location: "Madurai",
    },
    {
      email: "tamil@gmail.com",
      image: "https://iili.io/HNNDXBR.jpg",
      name: "Tamil",
      password: "Tami#123",
      phone: "7890654321",
      location: "Chennai",
    },
  ];
  localStorage.setItem("user_data", JSON.stringify(userId));
}

const imagesArray = JSON.parse(localStorage.getItem("images"));
if(!imagesArray){
  const images = [
    {
      image1:"https://iili.io/HNPWO2n.png",
      unique: "d5bb5f5a-63cc-4c03-9343-3e49d34de8bb",
    },
    {
      image1:"https://iili.io/HNPhFK7.png",
      unique: "6a2ca6ed-1566-4d09-b82a-97b7e62e1621",
    },
    {
      image1:"https://iili.io/HNPhJol.png",
      unique: "0b24c66d-4a2d-4f01-9b4c-7cc19d7458d1",
    },
    {
      image1:"https://iili.io/HNPhJol.png",
      unique: "5f5de8e7-5c28-4850-9073-55606af1e839",
    },
    {
      image1:"https://iili.io/HNPhzoQ.png",
      image2:"https://iili.io/HOCszD7.png",
      image3:"https://iili.io/HOCslRV.png",
      image4:"https://iili.io/HOCsVig.png",
      unique:"8f680fa7-9f50-45dc-bd96-2c2a7e1e685c",
    },
    {
      image1:"https://iili.io/HNPw9G2.png",
      unique:"8f680fa7-9f50-45dc-bd96-2c256rhe685c",
    },
    {
      image1:"https://iili.io/HOCPrhX.png",
      unique: "8f680fa7-9f50-45dc-b768-smdnmk1e685c",
    },
    {
      image1:"https://iili.io/HNPwOMl.png",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7e12ertf",
    },
    {
      image1:"https://iili.io/HNPweP2.png",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7epiofh5",
    },
    {
      image1:"https://iili.io/HNP67N2.jpg",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7e1cloae",
    },
    {
      image1:"https://iili.io/HNPi92a.jpg",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7ekflloc",
    },
    {
      image1:"https://iili.io/HNPigZN.jpg",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7e1e6pio",
    },
    {
      image1:"https://iili.io/HNPiDu4.jpg",
      unique: "8f680fa7-9f50-45dc-5678-2c2a7e1emkjuc",
    },
    {
      image1:"https://iili.io/HNPimt2.jpg",
      unique:"8f680fa7-9f50-ngdc-bd96-2c2a7e1e6789c"
    },
    {
      image1:"https://iili.io/HNPZGl1.jpg",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7e1e9832",
    },
    {
      image1:"https://iili.io/HNPZeiN.jpg",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7e1e5432",
    },
    {
      image1:"https://iili.io/HNPDUwG.jpg",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7e1cdfki",
    },
    {
      image1:"https://iili.io/HNPDQS9.jpg",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7e1e098f",
    },
    {
      image1:"https://iili.io/HNPDt9e.webp",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7e1epogt",
    },
    {
      image1: "https://iili.io/HrBzo67.jpg",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7e123vfg",
    },
  ]
  localStorage.setItem("images", JSON.stringify(images));
}

const productArray = JSON.parse(localStorage.getItem("product_data"));
if (!productArray) {
  const product_data = [
    {
      category: "Bike",
      date: "4",
      description:
        "Engine TypeSingle Cylinder, Liquid Cooled, DOHC, FI EngineDisplacement373.27 ccMax Torque37 Nm @ 7000 rpmNo. of Cylinders1Cooling SystemLiquid CooledValve Per Cylinder4StartingSelf Start OnlyFuel SupplyFuel InjectionClutchAssist & SlipperGear Box6 SpeedBore89 mmStroke60 mmCompression Ratio12.88:1Emission Typebs6",
      duration: "Month",
      name: "KTM 390",
      price: "200000",
      minimumPrice:"130000",
      unique: "d5bb5f5a-63cc-4c03-9343-3e49d34de8bb",
      uploaded_on: "2023-03-27",
      user_id: "sesslyn@gmail.com",
    },
    {
      category: "Bike",
      date: "2",
      description:
        "Engine TypeSI, 4 stroke, 4 valve, Single cylinder, Liquid cooled, Reverse inclinedDisplacement312.2 ccMax Torque27.3 Nm @ 7700 rpmNo. of Cylinders1Cooling SystemLiquid CooledValve Per Cylinder4StartingSelf Start OnlyFuel SupplyFuel InjectionClutchWet multi-plate, 7- plate design, RT-Slipper ClutchIgnitionDynamically controlled integrated high energy ignition systemGear Box6 SpeedBore80 mmStroke62.1 mmCompression Ratio10.9:1Emission Typebs6",
      duration: "Month",
      name: "TVS Apache RR 310",
      price: "210000",
      minimumPrice:"150000",
      unique: "6a2ca6ed-1566-4d09-b82a-97b7e62e1621",
      uploaded_on: "2023-12-02",
      user_id: "uthra@gmail.com",
    },
    {
      category: "Bike",
      date: "1",
      description:
        "Engine TypeLiquid-cooled, 4 Stroke, SI, BS-VI EngineDisplacement286.01 ccMax Torque27.5 Nm @ 7500 rpmNo. of Cylinders1Cooling SystemLiquid CooledValve Per Cylinder4StartingSelf Start OnlyFuel SupplyFuel InjectionClutchMultiplate Wet ClutchGear Box6 SpeedBore76.0 mmStroke63.043 mmCompression Ratio10.7:1Emission Typebs6",
      duration: "Month",
      name: "Honda CB300R",
      price: "180000",
      minimumPrice:"90000",
      unique: "5f5de8e7-5c28-4850-9073-55606af1e839",
      uploaded_on: "2023-03-20",
      user_id: "meena@gmail.com",
    },
    {
      category: "Bike",
      date: "6",
      description:
        "Displacement199 ccMax Torque18.74 Nm @ 8000 rpmCooling SystemLiquid CooledStartingSelf Start OnlyFuel SupplyFuel InjectionGear Box6 SpeedBore72 mmStroke49 mmEmission Typebs6",
      duration: "Month",
      name: "Bajaj Pulsar NS200",
      price: "150000",
      minimumPrice:"80000",
      unique: "0b24c66d-4a2d-4f01-9b4c-7cc19d7458d1",
      uploaded_on: "2023-06-27",
      user_id: "karkuvel@gmail.com",
    },
    {
      category: "Bike",
      date: "3",
      description:
        "Engine TypeInline twin cylinder, 4 stroke / SOHCDisplacement647.95 ccMax Torque52.3 Nm @ 5150 rpmNo. of Cylinders2Cooling SystemAir CooledStartingSelf Start OnlyFuel SupplyFuel InjectionClutchWet multi plateIgnitionDigital spark ignitionGear Box6 SpeedBore78 mmStroke67.8 mmCompression Ratio9.5:1Emission Typebs6",
      duration: "Month",
      // image: [
      //   "https://iili.io/HNPhzoQ.png",
      //   "https://iili.io/HOCszD7.png",
      //   "https://iili.io/HOCslRV.png",
      //   "https://iili.io/HOCsVig.png",
      // ],
      name: "R.E Continental GT 650",
      price: "250000",
      minimumPrice:"190000",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7e1e685c",
      uploaded_on: "2022-08-27",
      user_id: "tamil@gmail.com",
    },
    {
      category: "Car",
      date: "2",
      description:
        "Engine Type1.2 L i-CNGDisplacement (cc)1199Max Power72bhp@6000rpmMax Torque95nm@3500rpmNo. of cylinder3Valves Per Cylinder4TransmissionTypeManualGear Box5-Speed Fuel TypeCNGCNG Mileage (ARAI)26.49CNG Fuel Tank Capacity (Litres)60.0Secondary Fuel TypePetrolPetrol Mileage (ARAI)20.09Petrol Fuel Tank Capacity (Litres)35.0Emission Norm ComplianceBS VI",
      duration: "Year",
      name: "Tata Tiago",
      price: "1800000",
      minimumPrice:"1300000",
      unique: "8f680fa7-9f50-45dc-bd96-2c256rhe685c",
      uploaded_on: "2023-03-27",
      user_id: "sesslyn@gmail.com",
    },
    {
      category: "Car",
      date: "1",
      description:
        "Engine Type1.2 L K Series EngineDisplacement (cc)1197Max Power88.50bhp@6000rpmMax Torque113Nm@4400rpmNo. of cylinder4Valves Per Cylinder4TransmissionTypeAutomaticGear Box5 Speed Fuel TypePetrolPetrol Mileage (ARAI)22.94Petrol Fuel Tank Capacity (Litres)37.0Petrol Highway Mileage24.0Emission Norm ComplianceBS VI",
      duration: "Year",
      name: "Maruti Baleno",
      price: "2000000",
      minimumPrice:"1600000",
      unique: "8f680fa7-9f50-45dc-b768-smdnmk1e685c",
      uploaded_on: "2023-03-27",
      user_id: "uthra@gmail.com",
    },
    {
      category: "Car",
      date: "1",
      description:
        "Engine Type1.0 l Turbo GDi petrolDisplacement (cc)998Max Power118.36bhp@6000rpmMax Torque171.62nm@1500-4000rpmNo. of cylinder3Valves Per Cylinder4 TransmissionTypeAutomaticGear Box7 Speed DCT Fuel TypePetrolPetrol Mileage (ARAI)20.28Petrol Fuel Tank Capacity (Litres)37.0Petrol Highway Mileage17.18Emission Norm ComplianceBS VI",
      duration: "Year",
      name: "Hyundai i20",
      price: "3520000",
      minimumPrice:"3420000",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7e12ertf",
      uploaded_on: "2023-03-27",
      user_id: "meena@gmail.com",
    },
    {
      category: "Car",
      date: "5",
      description:
        "Engine Type1.5l Turbocharged Revotorq EngineDisplacement (cc)1497Max Power113.42bhp@3750rpmMax Torque260Nm@1500-2750rpmNo. of cylinder4Valves Per Cylinder4 TransmissionTypeAutomaticGear Box6 Speed Fuel TypeDieselDiesel Mileage (ARAI)24.07Diesel Fuel Tank Capacity (Litres)44.0Emission Norm ComplianceBS VI 2.0",
      duration: "Year",
      name: "Tata Nexon",
      price: "1000000",
      minimumPrice:"870000",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7epiofh5",
      uploaded_on: "2023-03-27",
      user_id: "karkuvel@gmail.com",
    },
    {
      category: "Car",
      date: "2",
      description:
        "Engine Type1.5 L CRDi VGTDisplacement (cc)1493Max Power113.43bhp@4000rpmMax Torque250nm@1500-2750rpmNo. of cylinder4Valves Per Cylinder4Fuel Supply SystemCRDi TransmissionTypeAutomaticGear Box6-SpeedDrive TypeFWD Fuel TypeDieselDiesel Mileage (ARAI)18.0Diesel Fuel Tank Capacity (Litres)50.0Emission Norm ComplianceBS VI",
      duration: "Year",
      name: "Kia Seltos",
      price: "1200000",
      minimumPrice:"800000",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7e123vfg",
      uploaded_on: "2023-03-27",
      user_id: "tamil@gmail.com",
    },
    {
      category: "Laptop-Desktop",
      date: "8",
      description: `Brand
    MSI
    Model Name
    MPG Trident AS 12TD-274IN-B71270F307816GS1TX11EMHAB6
    Operating System
    Windows 11 Home (64-bit)
    Suitable For
    Home/Office
    Type
    Gaming Tower
    Graphics
    RTX 3070 LHR
    Graphics Memory
    8 GB
    Color
    Black
    Processor Name
    Intel
    Processor Type
    Core i7-12700F
    Number of Cores
    8
    Processor Generation
    7th Gen
    Processor Speed
    4.9 GHz
    Chipset
    Intel B660
    Hard Disk Capacity
    0 TB
    RAM
    16 GB
    Memory Technology
    DDR4
    SSD Capacity
    1 TB
    Memory Socket Type
    DIMM
    Maximum System Memory
    64 GB`,
      duration: "Month",
      name: "Alien desktop",
      price: "200000",
      minimumPrice:"170000",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7e1cloae",
      uploaded_on: "2020-03-30",
      user_id: "sesslyn@gmail.com",
    },
    {
      category: "Laptop-Desktop",
      date: "19",
      description: `Dedicated Graphic Memory Type
    GDDR6
    Dedicated Graphic Memory Capacity
    8 GB
    Processor Brand
    Intel
    Processor Name
    Core i9
    Processor Generation
    10th Gen
    SSD
    Yes
    SSD Capacity
    1 TB
    RAM
    32 GB
    RAM Type
    DDR4
    Processor Variant
    10980HK
    Clock Speed
    2.4 GHz with Turbo Boost Upto 5.3 GHz
    Memory Slots
    2 Slots
    Expandable Memory
    Upto 32 GB
    RAM Frequency
    2666 MHz
    Cache
    16 MB
    Graphic Processor
    NVIDIA GeForce RTX 2080 with Max - Q
    Number of Cores
    8`,
      duration: "Month",
      name: "Alien laptop",
      price: "130000",
      minimumPrice:"80000",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7ekflloc",
      uploaded_on: "2019-03-27",
      user_id: "uthra@gmail.com",
    },
    {
      category: "Laptop-Desktop",
      date: "2",
      description: `
    Sales Package
    MacBook Pro, 67W USB-C Power Adapter, USB-C to MagSafe 3 Cable (2 m)
    Model Number
    MPHH3HN/A
    Part Number
    MPHH3HN/A
    Model Name
    MPHH3HN/A
    Series
    2023 MacBook Pro
    Color
    Silver
    Type
    Thin and Light Laptop
    Suitable For
    Processing & Multitasking
    Battery Backup
    Upto 18 Hours
    Power Supply
    67W USB-C Power Adapter
    Processor Brand
    Apple
    Processor Name
    M2 Pro
    SSD
    Yes
    SSD Capacity
    512 GB
    RAM
    16 GB
    RAM Type
    Unified Memory
    Processor Variant
    Apple M2 Pro
    Graphic Processor
    NA
    Number of Cores
    10`,
      duration: "Month",
      name: "Apple mac pro",
      price: "180000",
      minimumPrice:"130000",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7e1e6pio",
      uploaded_on: "2022-06-27",
      user_id: "meena@gmail.com",
    },
    {
      category: "Laptop-Desktop",
      date: "10",
      description: `
    Brand
    ASUS
    Model Name
    G15DK-R5800X298T
    Operating System
    Windows 10 Home (64-bit)
    Suitable For
    Gaming, Processing & Multitasking
    Optical Drive
    NA
    Type
    Gaming Tower
    Graphics
    NVIDIA GeForce RTX3070
    Graphics Memory
    8 GB
    Color
    Black
    Processor Name
    AMD
    Processor Type
    Ryzen 7 5800X
    Number of Cores
    8
    Processor Generation
    5th Gen
    Processor Speed
    3.8 Ghz
    Chipset
    AMD B550 Chipset
    Number of Installed Processors
    Hard Disk Capacity
    1 TB
    RAM
    16 GB
    Memory Technology
    DDR4
    SSD Capacity
    1 TB
    Memory Socket Type
    DIMM
    Maximum System Memory
    64 GB
    Cache Size
    36 MB`,
      duration: "Month",
      name: "Asus desktop",
      price: "90000",
      minimumPrice:"70000",
      unique: "8f680fa7-9f50-45dc-5678-2c2a7e1emkjuc",
      uploaded_on: "2013-03-22",
      user_id: "karkuvel@gmail.com",
    },
    {
      category: "Laptop-Desktop",
      date: "22",
      description: `
    Sales Package
    Laptop, Power Adaptor, Battery, Warranty Documents, User Guide
    Model Number
    FX506LHB-HN358W
    Part Number
    90NR03U2-M00D00
    Model Name
    FX506LHB-HN358W
    Series
    TUF Gaming F15
    Color
    Black Plastic
    Type
    Gaming Laptop
    Suitable For
    Gaming
    Power Supply
    150W AC Adapter
    Battery Cell
    3 Cell
    
Dedicated Graphic Memory Type
GDDR6
Dedicated Graphic Memory Capacity
4 GB
Processor Brand
Intel
Processor Name
Core i5
Processor Generation
10th Gen
SSD
Yes
SSD Capacity
512 GB
RAM
8 GB
RAM Type
DDR4
Processor Variant
10200H
Chipset
Mobile Intel HM470 Express Chipsets
Clock Speed
Base Frequency 2.4 GHz, Max Turbo Frequency at 4.1 GHz
Memory Slots
2
RAM Frequency
2933 MHz
Cache
8 MB
Graphic Processor
NVIDIA GeForce GTX 1650
Number of Cores
4
`,
      duration: "Month",
      name: "Asus desktop",
      price: "200000",
      minimumPrice:"150000",
      unique: "8f680fa7-9f50-ngdc-bd96-2c2a7e1e6789c",
      uploaded_on: "2020-07-17",
      user_id: "tamil@gmail.com",
    },
    {
      category: "Mobile",
      date: "10",
      description: `
    Display Size
    15.49 cm (6.1 inch)
    Resolution
    1792 x 828 Pixels
    GPU
    Apple-designed GPU - 4-core, Graphics Performance - Upto 50% Faster than A11 Bionic, Metal 2 Optimised, 3D, Graphics-intensive Gameplay, Faster and More Fluid
    Display Type
    All-screen LCD Multi-touch Display with IPS Technology
    HD Game Support
    Yes
    Other Display Features
    1400:1 Contrast Ratio (Typical), True Tone Display (Six-channel Light Sensor), Wide Colour Display (P3), 625 nits Maximum Brightness (Typical), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously, Liquid Retina HD Display, Tap to Wake, Wide Colour Gamut,
    Operating System
    iOS 14.2
    Processor Type
    A12 Bionic Chip`,
      duration: "Month",
      name: "Iphone XR",
      price: "45000",
      minimumPrice:"37000",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7e1e9832",
      uploaded_on: "2023-03-27",
      user_id: "sesslyn@gmail.com",
    },
    {
      category: "Mobile",
      date: "13",
      description: `
    Display Size
    17.22 cm (6.78 inch)
    Resolution
    2448 x 1080 Pixels
    Resolution Type
    Full HD+
    GPU
    Qualcomm Adreno 660
    Display Type
    Full HD+ Display
    Operating System
    Android 11
    Processor Type
    Qualcomm Snapdragon 888 Plus (SM8350)
    Processor Core
    Octa Core
    Primary Clock Speed
    2.99 GHz`,
      duration: "Month",
      name: "Asus mobile",
      price: "35000",
      minimumPrice:"32000",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7e1e5432",
      uploaded_on: "2023-02-07",
      user_id: "uthra@gmail.com",
    },
    {
      category: "Mobile",
      date: "22",
      description: `
    Display Size
    16.36 cm (6.44 inch)
    Resolution
    2400 x 1080 Pixels
    Resolution Type
    Full HD+
    GPU
    Adreno 650
    Display Type
    Super AMOLED
    Display Colors
    16M
    Other Display Features
    Screen HDR: HDR 10+, Bezel: 5.17mm (Lower), Screen to Body Ratio: 91.40%, Backside Corning Gorilla Glass, Corning Gorilla Glass Gen: GG6, Monster Touch Buttons 180Hz Touch Response Rate, Material Display: Schott Xensation UP
    Operating System
    Android 10
    Processor Type
    Qualcomm Snapdragon 865
    Processor Core
    Octa Core
    Primary Clock Speed
    2.8 GHz
    Secondary Clock Speed
    2.4 GHz
    Tertiary Clock Speed
    1.8 GHz
    Operating Frequency
    2G GSM: B2/B3/B5/B8, 3G WCDMA: B1/B2/B4/B5/B8, 4G TDD_LTE: B34/B38/B39/B40/B41, 4G FDD_LTE: B1/B2/B3/B4/B5/B7/B8/B12/B17/B18/B19/B20/B25/B26, 4G+: B1/B3/B5/B8/B39/B40/B41/38
    Internal Storage
    128 GB
    RAM
    8 GB`,
      duration: "Month",
      name: "Iq003",
      price: "28000",
      minimumPrice:"25000",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7e1cdfki",
      uploaded_on: "2022-11-27",
      user_id: "meena@gmail.com",
    },
    {
      category: "Mobile",
      date: "7",
      description: `Display Size
    16.51 cm (6.5 inch)
    Resolution
    2400 x 1080 Pixels
    Resolution Type
    Full HD+
    GPU
    ARM G57 MC3
    Display Type
    Full HD+ LCD In-cell Display
    Display Colors
    16.7M
    Other Display Features
    120 Hz Refresh Rate, 2.5D Gorilla Glass 3, 20:09 Display Ratio, 90.50% Screen-to-Body Ratio, 180 Hz Touch Sampling Rate, Screen Contrast: AVE 1500:1, 480nit (Typ) Max Brightness, Color Saturation: NTSC 81.5% (Typ), COG Sealing Process
    Operating System
    Android 10
    Processor Type
    MediaTek Dimensity 800U
    Processor Core
    Octa Core
    Primary Clock Speed
    2.4 GHz
    Secondary Clock Speed
    2 GHzInternal Storage
    128 GB
    RAM
    8 GB
    Expandable Storage
    256 GB`,
      duration: "Month",
      name: "Narzo 30 pro",
      price: "19000",
      minimumPrice:"17000",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7e1e098f",
      uploaded_on: "2020-06-17",
      user_id: "karkuvel@gmail.com",
    },
    {
      category: "Mobile",
      date: "12",
      description: `
    Display Size
    17.02 cm (6.7 inch)
    Resolution
    2400 x 1080 Pixels
    Resolution Type
    Full HD+
    GPU
    Qualcomm Adreno 642L
    Display Type
    Super AMOLED Plus
    HD Game Support
    Yes
    Display Colors
    16MOperating System
    Android 12
    Processor Type
    Qualcomm Snapdragon 778G
    Processor Core
    Octa Core
    Primary Clock Speed
    2.4 GHz
    Secondary Clock Speed
    1.8 GHzInternal Storage
    256 GB
    RAM
    8 GB
    Expandable Storage
    1 TBPrimary Camera Available
    Yes
    Primary Camera
    108MP + 12MP + 5MP + 5MP
    Secondary Camera Available
    Yes
    Secondary Camera
    32MP Front Camera`,
      duration: "Month",
      name: "Samsung A73",
      price: "30000",
      minimumPrice:"27000",
      unique: "8f680fa7-9f50-45dc-bd96-2c2a7e1epogt",
      uploaded_on: "2022-02-11",
      user_id: "tamil@gmail.com",
    },
  ];
  localStorage.setItem("product_data", JSON.stringify(product_data));
}
