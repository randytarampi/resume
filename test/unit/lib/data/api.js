import {getApiStateForUrl, getErrorForUrlState} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {Map} from "immutable";
import {createAction} from "redux-actions";
import {
    fetchingResume,
    fetchingResumeCancelled,
    fetchingResumeFailure,
    fetchingResumeSuccess
} from "../../../../lib/actions/fetchResume";
import reducer from "../../../../lib/data/api";

describe("api", function () {
    let stubInitialState;

    beforeEach(function () {
        stubInitialState = Map();
    });

    it("reduces the current state for some other action", function () {
        const stubFetchUrl = "/woof";
        const stubPayload = {
            fetchUrl: stubFetchUrl
        };

        const otherAction = createAction("OTHER_ACTION");

        const updatedState = reducer(stubInitialState, otherAction(stubPayload));
        const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
        expect(apiStateForUrl).to.not.be.ok;
        expect(apiStateForUrl).to.eql(undefined);

        const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
        expect(errorStateForUrl).to.not.be.ok;
        expect(errorStateForUrl).to.eql(undefined);
    });

    describe("FETCHING_RESUME", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubFetchUrl = "/woof";
            const stubPayload = {
                fetchUrl: stubFetchUrl
            };

            const updatedState = reducer(stubInitialState, fetchingResume(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql({
                isLoading: true
            });

            const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
            expect(errorStateForUrl).to.not.be.ok;
            expect(errorStateForUrl).to.eql(undefined);
        });

        it("reduces the correct state (has existing state)", function () {
            const stubFetchUrl = "/woof";
            const stubPayload = {
                fetchUrl: stubFetchUrl
            };

            stubInitialState = Map({
                [stubFetchUrl]: Map({
                    isLoading: false
                })
            });
            const updatedState = reducer(stubInitialState, fetchingResume(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql(
                stubInitialState
                    .get(stubFetchUrl)
                    .set("isLoading", true)
                    .toJS()
            );

            const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
            expect(errorStateForUrl).to.not.be.ok;
            expect(errorStateForUrl).to.eql(undefined);
        });
    });

    describe("FETCHING_RESUME_CANCELLED", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubFetchUrl = "/woof";
            const stubPayload = {
                fetchUrl: stubFetchUrl
            };

            const updatedState = reducer(stubInitialState, fetchingResumeCancelled(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql({
                isLoading: false
            });

            const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
            expect(errorStateForUrl).to.not.be.ok;
            expect(errorStateForUrl).to.eql(undefined);
        });

        it("reduces the correct state (has existing state)", function () {
            const stubFetchUrl = "/woof";
            const stubPayload = {
                fetchUrl: stubFetchUrl
            };

            stubInitialState = Map({
                [stubFetchUrl]: Map({
                    isLoading: false
                })
            });
            const updatedState = reducer(stubInitialState, fetchingResumeCancelled(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql(
                stubInitialState
                    .get(stubFetchUrl)
                    .set("isLoading", false)
                    .toJS()
            );

            const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
            expect(errorStateForUrl).to.not.be.ok;
            expect(errorStateForUrl).to.eql(undefined);
        });
    });

    describe("FETCHING_RESUME_FAILURE", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubFetchUrl = "/woof";
            const stubPayload = {
                fetchUrl: stubFetchUrl,
                error: new Error("woof")
            };

            const updatedState = reducer(stubInitialState, fetchingResumeFailure(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql({
                error: stubPayload.error,
                isLoading: false
            });

            const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
            expect(errorStateForUrl).to.be.ok;
            expect(errorStateForUrl).to.eql(stubPayload.error);
        });

        it("reduces the correct state (has existing state)", function () {
            const stubFetchUrl = "/woof";
            const stubPayload = {
                fetchUrl: stubFetchUrl,
                error: new Error("grr")
            };

            stubInitialState = Map({
                [stubFetchUrl]: Map({
                    isLoading: false
                })
            });
            const updatedState = reducer(stubInitialState, fetchingResumeFailure(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql(
                stubInitialState
                    .get(stubFetchUrl)
                    .set("isLoading", false)
                    .set("error", stubPayload.error)
                    .toJS()
            );

            const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
            expect(errorStateForUrl).to.be.ok;
            expect(errorStateForUrl).to.eql(stubPayload.error);
        });
    });

    describe("FETCHING_RESUME_SUCCESS", function () {
        it("reduces the correct state (no prior state)", function () {
            const stubFetchUrl = "/woof";
            const stubPayload = {
                fetchUrl: stubFetchUrl
            };

            const updatedState = reducer(stubInitialState, fetchingResumeSuccess(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql({
                isLoading: false
            });

            const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
            expect(errorStateForUrl).to.not.be.ok;
            expect(errorStateForUrl).to.eql(undefined);
        });

        it("reduces the correct state (has existing state)", function () {
            const stubFetchUrl = "/woof";
            const stubPayload = {
                fetchUrl: stubFetchUrl
            };

            stubInitialState = Map({
                [stubFetchUrl]: Map({
                    isLoading: false
                })
            });
            const updatedState = reducer(stubInitialState, fetchingResumeSuccess(stubPayload));
            const apiStateForUrl = getApiStateForUrl(updatedState, stubFetchUrl);
            expect(apiStateForUrl).to.be.ok;

            const apiStateForUrlObject = apiStateForUrl.toJS();
            expect(apiStateForUrlObject).to.be.ok;
            expect(apiStateForUrlObject).to.eql(
                stubInitialState
                    .get(stubFetchUrl)
                    .set("isLoading", false)
                    .toJS()
            );

            const errorStateForUrl = getErrorForUrlState(apiStateForUrl);
            expect(errorStateForUrl).to.not.be.ok;
            expect(errorStateForUrl).to.eql(undefined);
        });
    });
});
