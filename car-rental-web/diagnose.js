const fs = require('fs');
try {
    console.log('Attempting to require @prisma/client...');
    const { PrismaClient } = require('@prisma/client');
    console.log('Successfully required @prisma/client');

    const prisma = new PrismaClient();
    console.log('Successfully instantiated PrismaClient');
} catch (e) {
    console.error('Error caught:', e);
    fs.writeFileSync('diagnosis_log.txt', e.toString() + '\\n' + e.stack);
}
