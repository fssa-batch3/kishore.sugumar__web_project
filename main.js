let userId = [
    {
        email: "sesslyn@gmail.com",
        image: "https://iili.io/HNUCkOP.png",
        name: "Sesslyn",
        password: "Sess#123",
        phone: "789054321",
        location: "Tirutani"
    },
    {
        email: "uthra@gmail.com",
        image: "https://iili.io/HNUCSzF.jpg",
        name: "Uthra",
        password: "Uthr#123",
        phone: "7904911208",
        location: "Pondicherry"
    },
    {
        email: "meena@gmail.com",
        image: "https://iili.io/HNUCZbt.jpg",
        name: "Meena",
        password: "Meen#123",
        phone: "7416687991",
        location: "Trichy"
    },
    {
        email: "karkuvel@gmail.com",
        image: "https://iili.io/HNUBEMJ.jpg",
        name: "Karkuvel",
        password: "Kark#123",
        phone: "9870000890",
        location: "Madurai"
    },
    {
        email: "tamil@gmail.com",
        image: "https://iili.io/HNNDXBR.jpg",
        name: "Tamil",
        password: "Tami#123",
        phone: "7890654321",
        location: "Chennai"
    },
];

localStorage.setItem("user_data", JSON.stringify(userId))

let product_data = [{
    "category": "Bike",
    "date": "4",
    "description": "Engine TypeSingle Cylinder, Liquid Cooled, DOHC, FI EngineDisplacement373.27 ccMax Torque37 Nm @ 7000 rpmNo. of Cylinders1Cooling SystemLiquid CooledValve Per Cylinder4StartingSelf Start OnlyFuel SupplyFuel InjectionClutchAssist & SlipperGear Box6 SpeedBore89 mmStroke60 mmCompression Ratio12.88:1Emission Typebs6",
    "duration": "Month",
    "image": "",
    "name": "KTM 390",
    "price": "",
    "unique": "d5bb5f5a-63cc-4c03-9343-3e49d34de8bb",
    "uploaded_on": "2023-03-27",
    "user_id": "sesslyn@gmail.com"
},
{
    "category": "Bike",
    "date": "2",
    "description": "Engine TypeSI, 4 stroke, 4 valve, Single cylinder, Liquid cooled, Reverse inclinedDisplacement312.2 ccMax Torque27.3 Nm @ 7700 rpmNo. of Cylinders1Cooling SystemLiquid CooledValve Per Cylinder4StartingSelf Start OnlyFuel SupplyFuel InjectionClutchWet multi-plate, 7- plate design, RT-Slipper ClutchIgnitionDynamically controlled integrated high energy ignition systemGear Box6 SpeedBore80 mmStroke62.1 mmCompression Ratio10.9:1Emission Typebs6",
    "duration": "Month",
    "image": "",
    "name": "TVS Apache RR 310",
    "price": "",
    "unique": "6a2ca6ed-1566-4d09-b82a-97b7e62e1621",
    "uploaded_on": "2023-12-02",
    "user_id": "uthra@gmail.com"
},
{
    "category": "Bike",
    "date": "1",
    "description": "Engine TypeLiquid-cooled, 4 Stroke, SI, BS-VI EngineDisplacement286.01 ccMax Torque27.5 Nm @ 7500 rpmNo. of Cylinders1Cooling SystemLiquid CooledValve Per Cylinder4StartingSelf Start OnlyFuel SupplyFuel InjectionClutchMultiplate Wet ClutchGear Box6 SpeedBore76.0 mmStroke63.043 mmCompression Ratio10.7:1Emission Typebs6",
    "duration": "Month",
    "image": "",
    "name": "Honda CB300R",
    "price": "",
    "unique": "5f5de8e7-5c28-4850-9073-55606af1e839",
    "uploaded_on": "2023-03-20",
    "user_id": "meena@gmail.com"
},
{
    "category": "Bike",
    "date": "6",
    "description": "Displacement199 ccMax Torque18.74 Nm @ 8000 rpmCooling SystemLiquid CooledStartingSelf Start OnlyFuel SupplyFuel InjectionGear Box6 SpeedBore72 mmStroke49 mmEmission Typebs6",
    "duration": "Month",
    "image": "",
    "name": "Bajaj Pulsar NS200",
    "price": "",
    "unique": "0b24c66d-4a2d-4f01-9b4c-7cc19d7458d1",
    "uploaded_on": "2023-06-27",
    "user_id": "karkuvel@gmail.com"
},
{
    "category": "Bike",
    "date": "3",
    "description": "Engine TypeInline twin cylinder, 4 stroke / SOHCDisplacement647.95 ccMax Torque52.3 Nm @ 5150 rpmNo. of Cylinders2Cooling SystemAir CooledStartingSelf Start OnlyFuel SupplyFuel InjectionClutchWet multi plateIgnitionDigital spark ignitionGear Box6 SpeedBore78 mmStroke67.8 mmCompression Ratio9.5:1Emission Typebs6",
    "duration": "Month",
    "image": "",
    "name": "R.E Continental GT 650",
    "price": "",
    "unique": "8f680fa7-9f50-45dc-bd96-2c2a7e1e685c",
    "uploaded_on": "2022-08-27",
    "user_id": "tamil@gmail.com"
},
{
    "category": "Car",
    "date": "2",
    "description": "Engine Type1.2 L i-CNGDisplacement (cc)1199Max Power72bhp@6000rpmMax Torque95nm@3500rpmNo. of cylinder3Valves Per Cylinder4TransmissionTypeManualGear Box5-Speed Fuel TypeCNGCNG Mileage (ARAI)26.49CNG Fuel Tank Capacity (Litres)60.0Secondary Fuel TypePetrolPetrol Mileage (ARAI)20.09Petrol Fuel Tank Capacity (Litres)35.0Emission Norm ComplianceBS VI",
    "duration": "Year",
    "image": "",
    "name": "Tata Tiago",
    "price": "2",
    "unique": "8f680fa7-9f50-45dc-bd96-2c256rhe685c",
    "uploaded_on": "2023-03-27",
    "user_id": "sesslyn@gmail.com"
},
{
    "category": "Car",
    "date": "1",
    "description": "Engine Type1.2 L K Series EngineDisplacement (cc)1197Max Power88.50bhp@6000rpmMax Torque113Nm@4400rpmNo. of cylinder4Valves Per Cylinder4TransmissionTypeAutomaticGear Box5 Speed Fuel TypePetrolPetrol Mileage (ARAI)22.94Petrol Fuel Tank Capacity (Litres)37.0Petrol Highway Mileage24.0Emission Norm ComplianceBS VI",
    "duration": "Year",
    "image": "6",
    "name": "Maruti Baleno",
    "price": "",
    "unique": "8f680fa7-9f50-45dc-b768-smdnmk1e685c",
    "uploaded_on": "2023-03-27",
    "user_id": "uthra@gmail.com"
},
{
    "category": "Car",
    "date": "1",
    "description": "Engine Type1.0 l Turbo GDi petrolDisplacement (cc)998Max Power118.36bhp@6000rpmMax Torque171.62nm@1500-4000rpmNo. of cylinder3Valves Per Cylinder4 TransmissionTypeAutomaticGear Box7 Speed DCT Fuel TypePetrolPetrol Mileage (ARAI)20.28Petrol Fuel Tank Capacity (Litres)37.0Petrol Highway Mileage17.18Emission Norm ComplianceBS VI",
    "duration": "Year",
    "image": "",
    "name": "Hyundai i20",
    "price": "",
    "unique": "8f680fa7-9f50-45dc-bd96-2c2a7e12ertf",
    "uploaded_on": "2023-03-27",
    "user_id": "meena@gmail.com"
},
{
    "category": "Car",
    "date": "5",
    "description": "Engine Type1.5l Turbocharged Revotorq EngineDisplacement (cc)1497Max Power113.42bhp@3750rpmMax Torque260Nm@1500-2750rpmNo. of cylinder4Valves Per Cylinder4 TransmissionTypeAutomaticGear Box6 Speed Fuel TypeDieselDiesel Mileage (ARAI)24.07Diesel Fuel Tank Capacity (Litres)44.0Emission Norm ComplianceBS VI 2.0",
    "duration": "Year",
    "image": "",
    "name": "Tata Nexon",
    "price": "",
    "unique": "8f680fa7-9f50-45dc-bd96-2c2a7epiofh5",
    "uploaded_on": "2023-03-27",
    "user_id": "karkuvel@gmail.com"
},
{
    "category": "Car",
    "date": "2",
    "description": "Engine Type1.5 L CRDi VGTDisplacement (cc)1493Max Power113.43bhp@4000rpmMax Torque250nm@1500-2750rpmNo. of cylinder4Valves Per Cylinder4Fuel Supply SystemCRDi TransmissionTypeAutomaticGear Box6-SpeedDrive TypeFWD Fuel TypeDieselDiesel Mileage (ARAI)18.0Diesel Fuel Tank Capacity (Litres)50.0Emission Norm ComplianceBS VI",
    "duration": "Year",
    "image": "",
    "name": "Kia Seltos",
    "price": "",
    "unique": "8f680fa7-9f50-45dc-bd96-2c2a7e123vfg",
    "uploaded_on": "2023-03-27",
    "user_id": "tamil@gmail.com"
},
]

// sesslyn@gmail.com
// uthra@gmail.com
// meena@gmail.com
// karkuvel@gmail.com
// tamil@gmail.com

// {
//     "category": "",
//     "date": "",
//     "description": "",
//     "duration": "Year",
//     "image": "",
//     "name": "",
//     "price": "",
//     "unique": "8f680fa7-9f50-45dc-bd96-2c2a7e1e685c",
//     "uploaded_on": "2023-03-27",
//     "user_id": "
// },