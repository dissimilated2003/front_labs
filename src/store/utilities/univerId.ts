export function univId() {
    const univId = new Array(36);
    for (let i = 0; i < 36; i++) {
        univId[i] = Math.floor(Math.random() * 16);
    }
    univId[14] = 4; 
    univId[19] = univId[19] &= ~(1 << 2); 
    univId[19] = univId[19] |= (1 << 3); 
    univId[8]  = univId[13] = univId[18] = univId[23] = '-';
    return univId.map((x) => x.toString(16)).join('');
}