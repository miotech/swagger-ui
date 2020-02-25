import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { Iterable, List } from "immutable"
import ImPropTypes from "react-immutable-proptypes"
import toString from "lodash/toString"


export default class OperationSummary extends PureComponent {

  static propTypes = {
    specPath: ImPropTypes.list.isRequired,
    operationProps: PropTypes.instanceOf(Iterable).isRequired,
    toggleShown: PropTypes.func.isRequired,
    getComponent: PropTypes.func.isRequired,
    getConfigs: PropTypes.func.isRequired,
    authActions: PropTypes.object,
    authSelectors: PropTypes.object,
  }

  static defaultProps = {
    operationProps: null,
    specPath: List(),
    summary: ""
  }

  // add by Yishu: open all the item by default
  componentDidMount() {
    this.props.toggleShown();
  }

  render() {

    let {
      toggleShown,
      getComponent,
      authActions,
      authSelectors,
      operationProps,
      specPath,
    } = this.props

    let {
      summary,
      isAuthorized,
      method,
      op,
      showSummary,
      operationId,
      originalOperationId,
      displayOperationId,
    } = operationProps.toJS()

    let {
      summary: resolvedSummary,
    } = op

    let security = operationProps.get("security")

    const AuthorizeOperationBtn = getComponent("authorizeOperationBtn")
    const OperationSummaryMethod = getComponent("OperationSummaryMethod")
    const JumpToPath = getComponent("JumpToPath", true)
    const Markdown = getComponent("Markdown")

    return (

      <h4 className={`opblock-summary opblock-summary-${method}`} onClick={toggleShown} >
        <OperationSummaryMethod method={method} />

        {!showSummary ? null :
          <Markdown
            className="opblock-summary-path"
            source={toString(resolvedSummary || summary)}
          />
        }

        {displayOperationId && (originalOperationId || operationId) ? <span className="opblock-summary-operation-id">{originalOperationId || operationId}</span> : null}

        {
          (!security || !security.count()) ? null :
            <AuthorizeOperationBtn
              isAuthorized={isAuthorized}
              onClick={() => {
                const applicableDefinitions = authSelectors.definitionsForRequirements(security)
                authActions.showDefinitions(applicableDefinitions)
              }}
            />
        }
        <JumpToPath path={specPath} />{/* TODO: use wrapComponents here, swagger-ui doesn't care about jumpToPath */}
      </h4>
    )

  }
}
