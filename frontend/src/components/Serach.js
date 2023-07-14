import React from 'react'

export default function Serach() {
    return (
        <>
            <div class="input-group">
                <div class="form-outline">
                    <input id="search-focus" type="search" itemID="form1" class="form-control" />
                    <label class="form-label" for="form1">Search</label>
                </div>
                <button type="button" class="btn btn-primary">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        </>
    )
}
