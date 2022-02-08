class ApiProductos {
    constructor() {
        this.array = []
        this.id = 0
    }

    getAll() {
        return [...this.array]
    }

    getById(data) {
        const Result = this.array.find(resp => resp.id === data)
        return Result || { error: 'producto no encontrado' }
    }

    save(product) {
        const Add = { ...product, id: ++this.id }
        this.array.push(Add)
        return Add
    }

    updateById(id, object) {
        const newProd = { id: Number(id), ...object }
        const index = this.array.findIndex(resp => resp.id == id)
        if (index !== -1) {
            this.array[index] = newProd
            return newProd
        } else {
            return { error: 'producto no encontrado' }
        }
    }

    deleteByID(data) {
        const Index = this.array.findIndex(resp => resp.id == data)
        if (Index != -1) {
            const Delete = this.array.splice(Index, 1);
            return Delete

        } else {
            return { error: 'producto no encontrado' }
        }
    }
}
module.exports = ApiProductos