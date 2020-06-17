class LifeGame {
    constructor (rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.generationNumber = 0;

        this.map = [];

        for(let x = 0; x < this.rows; x++) {
            const row = [];

            for (let y = 0; y < this.columns; y++) {
                row.push(false);
            }

            this.map.push(row);
        }
    }
    
    getOrganism(x, y) {
        if(x < 0 || x >= this.rows || y < 0 || y >= this.columns)
            return false
        else
            return this.map[x][y]
    }

    setOrganism(x, y, value) {
        if(x < 0 || x >= this.rows || y < 0 || y >= this.columns)
            return value
        else
            return this.map[x][y] = value
    }

    reviveRandomOrganisms(num = 1) {
        let freeCells = [];

        for(let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.columns; y++) {
                if(!this.getOrganism(x, y)) 
                    freeCells.push({x, y})
            }
        }

        num = parseInt(num);
        num = Math.min(num, freeCells.length);
        
        while(num-- > 0) {
            const index = Math.floor(Math.random() * freeCells.length);
            const {x, y} = freeCells.splice(index, 1)[0]
            this.setOrganism(x, y, true);
        }
    }

    forFreeEach(callback) {
        for(let x = 0; x < this.rows; x++) {
            for (let y = 0; y < this.columns; y++) {
                if(this.getOrganism(x, y)) 
                    callback(x, y)
            }
        }
    }

    changeGeneration() {
        const map = [];

        for(let x = 0; x < this.rows; x++) {
            const row = [];

            for (let y = 0; y < this.columns; y++) {
                let neighborsNumber = 0,
                    state = false;

                for(let dx = -1; dx <= 1; dx++) {
                    for(let dy = -1; dy <= 1; dy++) {
                        if(dx === 0 && dy === 0)
                            continue
                            
                        neighborsNumber += this.getOrganism(x + dx, y + dy)
                    }
                }
                
                if(this.getOrganism(x, y)) {
                    if(neighborsNumber === 2 || neighborsNumber === 3) {
                        state = true
                    }
                }

                else {
                    if(neighborsNumber === 3) {
                        state = true
                    }
                }

                row.push(state);
            }

            map.push(row);
        }

        this.map = map;
        this.generationNumber++;
    }
}
