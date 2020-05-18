import React from 'react';
import Icon from './Icon'

class UserCard extends React.Component {
    render(account) {
        return(
            <div class="three wide column segment">
                <div class="ts segmented single line items">
                    <div class="ts single line items">
                        <div class="item">
                            <div class="content">
                                <div class="ts header"><center>User</center></div>
                                <div>
                                    <center><Icon/></center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserCard;
