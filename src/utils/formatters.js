const formatters = {

  currencyFormatter: (num) => {
    return num.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })
  },
  formatDate: (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  }
}

export { formatters };