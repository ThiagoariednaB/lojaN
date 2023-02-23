module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { Key: 'Access-Control-Allow-Credentials', value: 'true' },
          { Key: 'Access-Control-Allow-Origin', value: '*'},          
          { Key: 'Access-Control-Allow-Headers', value: 'Origin, X-Resquested-With, Content-Type, Accept, Authorization'},
          { Key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'}
        ]
      }
    ]
  }
}
