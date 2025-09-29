export default function handler(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    
    const { x, y } = req.query;
    
    if (!x || !y || x === '{}' || y === '{}' || isNaN(x) || isNaN(y)) {
        return res.status(200).send('NaN');
    }
    
    let bigX, bigY;
    
    try {
        bigX = BigInt(x);
        bigY = BigInt(y);
    } catch (e) {
        return res.status(200).send('NaN');
    }
    
    if (bigX < 0n || bigY < 0n) {
        return res.status(200).send('NaN');
    }
    
    function gcd(a, b) {
        while (b !== 0n) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
    
    function lcm(a, b) {
        if (a === 0n || b === 0n) return 0n;
        return (a * b) / gcd(a, b);
    }
    const result = lcm(bigX, bigY);
    
    return res.status(200).send(result.toString());
}
