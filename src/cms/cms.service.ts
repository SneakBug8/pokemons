import fetch from "node-fetch";
import { Injectable } from "@nestjs/common";
import DotenvService from "../base/dotenv.service";

@Injectable()
export class CmsService
{
    CockpitUrl = "";
    CockpitToken = "";
    constructor(private readonly dotnetService: DotenvService)
    {
        this.CockpitUrl = dotnetService.config.CockpitUrl as string;
        this.CockpitToken = dotnetService.config.CockpitToken as string;
    }

    getUrl(url: string): string
    {
        return this.CockpitUrl + url + "?token=" + this.CockpitToken;
    }

    collections = {
        get: async <T>(collectionName: string) =>
        {
            const res = await fetch(this.getUrl("/api/collections/get/" + collectionName));

            const product = await res.json();

            if (res.ok && !product.error && product.total) {
                return product.entries as T;
            }
            else {
                return false;
            }
        },
        getWithParams: async <T>(collectionName: string, requestBody: RequestParams) =>
        {
            const init = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            };

            const res = await fetch(this.getUrl("/api/collections/get/" + collectionName), init);
            const product = await res.json();

            if (res.ok && !product.error && product.total) {
                return product.entries as T;
            }

            return undefined;
        },
        save: async (collectionName: string, requestBody: any) =>
        {
            const init = {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    data: requestBody
                })
            };

            const res = await fetch(this.getUrl("/api/collections/save/" + collectionName), init);
            if (res.ok) {
                return await res.text();
            }

            return undefined;
        }
    };

    forms = {
        submit: async (formName: string, formData: object) =>
        {
            const res = await fetch(this.getUrl("/api/forms/submit/" + formName), {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    form: formData
                })
            });

            if (res.ok) {
                return await res.json();
            }

            return undefined;
        }
    };

    singletons = {
        get: async (singletonName: string) =>
        {
            const res = await fetch(this.getUrl("/api/singletons/get/" + singletonName));

            if (res.ok && res) {
                return res.json();
            }
            else {
                return undefined;
            }
        }
    };
}

interface RequestParams
{
    filter?: {
        _id?: number | undefined;
        _created?: number | undefined;
        _modified?: number | undefined;
        [key: string]: string | number | boolean | undefined;
    } | undefined;
    sort?: {
        _id?: number | undefined;
        _created?: number | undefined;
        _modified?: number | undefined;
        [key: string]: number | undefined;
    } | undefined;
    limit?: number | undefined;
    skip?: number | undefined;
    fields?: {
        _id?: number | undefined;
        _created?: number | undefined;
        _modified?: number | undefined;
        [key: string]: number | undefined;
    } | undefined;
}

export interface CmsObjectData
{
    _created: string,
    _modified: string,
    [key: string]: any;
}
