import React from "react";
// import BalanceComponent from "../Utility/BalanceComponent";
import FormattedAsset from "../Utility/FormattedAsset";
import counterpart from "counterpart";
import AmountSelector from "../Utility/AmountSelectorStyleGuide";
import {ChainStore, ChainTypes} from "tuscjs";
import {Asset} from "common/MarketClasses";
import AssetWrapper from "../Utility/AssetWrapper";
import {
    Modal,
    Button,
    Alert,
    Icon,
} from "bitshares-ui-style-guide";
import ApplicationApi from "../../api/ApplicationApi";

class UnlockModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.getInitialState(props);
        this.onSubmit = this.onSubmit.bind(this);


        // this._getTickets();
    }

    componentWillReceiveProps(np) {
        if (
            np.asset &&
            this.props.asset &&
            np.asset.get("id") !== this.props.asset.get("id")
        ) {
            this.getInitialState(np);
        }
    }
    
    getInitialState(props) {
        return {
            targetType: null,
            amount: 0,
            amountAsset: new Asset({
                amount: 0,
                asset_id: props.asset.get("id"),
                precision: props.asset.get("precision")
            }),
            // isTicketsLoaded: false,
            tickets: this.props.tickets,
            unlockableTickets: this.props.unlockableTickets, 
        };
    }


    onSubmit() {
        ApplicationApi.unlockTickets(
            this.props.account,
            this.props.unlockableTickets,
        ).then(() => {
            console.log("tickets unlocked");
        });
        this.props.hideModal();
    }

    _getUnlockPeriod() {
        if (!this.state.targetType) return 0;
        const unlockPeriods = {
            0: 0,
            1: 180,
            2: 360,
            3: 720,
            4: Infinity
        };
        return unlockPeriods[this.state.targetType];
    }


    render() {
        let assetId = this.props.asset.get("id");

        let currentBalance =
            this.props.account &&
            this.props.account.get("balances", []).size &&
            !!this.props.account.getIn(["balances", assetId])
                ? ChainStore.getObject(
                      this.props.account.getIn(["balances", assetId])
                  )
                : null;
        if (!currentBalance) {
            currentBalance = 0;
            assetId = '';
        } else {
            assetId = currentBalance.get("assetId");
            currentBalance = currentBalance.get("balance");
        }
        
        let unlockableBalance = 0;
        for(let i = 0; i < this.props.unlockableTickets.length; i++){
            unlockableBalance = unlockableBalance + Number(this.props.unlockableTickets[i].amount.amount);
        }
        let newBalance = currentBalance + unlockableBalance;

        return (
            <Modal
                visible={this.props.visible}
                onCancel={this.props.hideModal}
                title={counterpart.translate("modal.unlock.title")}
                footer={[
                    <Button
                        type="primary"
                        key="submit"
                        onClick={this.onSubmit}
                        // disabled={!this.state.isTicketsLoaded}
                    >
                        {counterpart.translate("modal.unlock.submit")}
                    </Button>,
                    <Button onClick={this.props.hideModal} key="cancel">
                        {counterpart.translate("cancel")}
                    </Button>
                ]}
            >
                <Alert
                    message={counterpart.translate(
                        "modal.unlock.warning_message",
                        {lock_days: this._getUnlockPeriod()}
                    )}
                    type="warning"
                    showIcon
                    style={{marginBottom: "2em"}}
                />
                <div>
                    Amount available to unlock
                      
                </div>
                <div>
                    <FormattedAsset
                        amount={unlockableBalance}
                        asset={assetId}
                        asPercentage={this.props.asPercentage}
                        assetInfo={this.props.assetInfo}
                        replace={this.props.replace}
                        hide_asset={this.props.hide_asset}
                    />
                </div>
                <br/>

                <div>Total amount available once unlock period is complete</div>
                <div>
                    <FormattedAsset
                        amount={newBalance}
                        asset={assetId}
                        asPercentage={this.props.asPercentage}
                        assetInfo={this.props.assetInfo}
                        replace={this.props.replace}
                        hide_asset={this.props.hide_asset}
                    />
                </div>
                
            </Modal>
        );
    }
}

UnlockModal = AssetWrapper(UnlockModal, {
    propNames: ["asset"]
});

export default UnlockModal;
