const recursiveParseJSONBuffers = (jsonObj: Object) : Object => {
    Object.keys(jsonObj).forEach(function(key) {
        // @ts-ignore
        let val = jsonObj[key];
        let valType = typeof val;
        if (val && valType === 'object') {
            // Recurse through fields
            val = recursiveParseJSONBuffers(val)

            // Parse buffer
            if (val.type && val.type === 'Buffer' && val.data) {
                // @ts-ignore
                jsonObj[key] = Buffer.from(val.data)
            }
        }
    });

    return jsonObj
}

const parseJSONFromBuffer = (jsonBuffer: Buffer): Object => {
    return recursiveParseJSONBuffers(JSON.parse(jsonBuffer.toString()))
}

export {
    parseJSONFromBuffer,
    recursiveParseJSONBuffers,
}